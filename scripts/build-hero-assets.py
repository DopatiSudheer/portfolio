#!/usr/bin/env python3
"""Seamless looping hero clip. Usage: python scripts/build-hero-assets.py intro.mp4 [x y w h]
Needs ffmpeg + numpy. Default crop suits a 1280x720 source. Backdrop measured ~0.95, so the white point is 0.925 (brief said 0.98; raise it if your backdrop is whiter)."""
import subprocess, sys, os, numpy as np, wave, tempfile
src = sys.argv[1]
x, y, w, h = (map(int, sys.argv[2:6]) if len(sys.argv) > 5 else (360, 10, 560, 700))
F = 0.5
out = os.path.join(os.path.dirname(__file__), "..", "public")
os.makedirs(out + "/hero", exist_ok=True)
D = float(subprocess.check_output(["ffprobe","-v","error","-show_entries","format=duration","-of","csv=p=0",src]))
tmp = tempfile.mkdtemp()
# audio: sample-accurate crossfade in numpy
wav = f"{tmp}/a.wav"
subprocess.run(["ffmpeg","-v","error","-y","-i",src,"-vn","-ac","1","-ar","48000",wav],check=True)
with wave.open(wav) as f: a = np.frombuffer(f.readframes(f.getnframes()),np.int16).astype(np.float32)/32768
sr, f_n = 48000, int(F*48000)
D = min(D, len(a)/sr)   # use the shorter of audio/video so both loop in step
N = len(a) - f_n
t = np.linspace(0, np.pi/2, f_n, dtype=np.float32)
blend = a[N:N+f_n]*np.cos(t) + a[:f_n]*np.sin(t)   # equal-power
loop = np.concatenate([blend, a[f_n:N]])
with wave.open(f"{tmp}/loop.wav","wb") as o:
    o.setnchannels(1); o.setsampwidth(2); o.setframerate(sr)
    o.writeframes((np.clip(loop,-1,1)*32767).astype(np.int16).tobytes())
# video: tail xfades into head, then the untouched middle
vf = (f"[0:v]crop={w}:{h}:{x}:{y},scale=768:960,colorlevels=rimax=0.925:gimax=0.925:bimax=0.925,split=3[a][b][c];"
      f"[a]trim={D-F}:{D},setpts=PTS-STARTPTS[t];[b]trim=0:{F},setpts=PTS-STARTPTS[h];"
      f"[c]trim={F}:{D-F},setpts=PTS-STARTPTS[m];[t][h]xfade=transition=fade:duration={F-0.04}:offset=0[x];[x][m]concat=n=2:v=1[v]")
base = ["ffmpeg","-v","error","-y","-i",src,"-i",f"{tmp}/loop.wav","-filter_complex",vf,"-map","[v]","-map","1:a","-shortest"]
subprocess.run(base+["-c:v","libx264","-pix_fmt","yuv420p","-crf","24","-preset","slow","-c:a","aac","-b:a","96k","-movflags","+faststart",out+"/hero/hero.mp4"],check=True)
subprocess.run(base+["-c:v","libvpx-vp9","-crf","36","-b:v","0","-c:a","libopus","-b:a","80k",out+"/hero/hero.webm"],check=True)
# stills: clearest frame mid-clip
subprocess.run(["ffmpeg","-v","error","-y","-ss","6","-i",src,"-frames:v","1","-vf",f"crop={w}:{h}:{x}:{y},scale=768:960",f"{tmp}/s.png"],check=True)
print("done", os.listdir(out+"/hero"))
