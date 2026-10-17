"""生成 OG 分享图(1200x630)与图标。用法: python3 scripts/make-images.py  (需要 playwright + chromium)"""
import pathlib
from playwright.sync_api import sync_playwright

root = pathlib.Path(__file__).resolve().parent.parent
pub = root / "public"
logo = (pub / "favicon.svg").read_text()

og = f"""<html><body style="margin:0;width:1200px;height:630px;font-family:'Noto Sans CJK SC',sans-serif;
background:radial-gradient(600px 360px at 88% 12%,#e9efff,transparent 70%),radial-gradient(560px 320px at 0% 0%,#f1ebff,transparent 70%),#fff;
display:flex;flex-direction:column;justify-content:center;padding:0 96px;box-sizing:border-box;color:#15142a">
<div style="display:flex;align-items:center;gap:20px"><div style="width:88px;height:88px">{logo}</div>
<div style="font-size:44px;font-weight:700">灵动云</div></div>
<div style="font-size:76px;font-weight:800;margin-top:34px;letter-spacing:2px">灵动云官网</div>
<div style="font-size:34px;color:#45465e;margin-top:18px">月付、年付与一次性流量方案 · 套餐价格与客户端教程</div>
<div style="margin-top:44px;display:flex;gap:16px">
<span style="background:linear-gradient(120deg,#6a3df0,#2f63e6);color:#fff;font-size:28px;font-weight:700;padding:14px 30px;border-radius:16px">8 档套餐</span>
<span style="border:2px solid #d6d1f0;color:#5228d6;font-size:28px;font-weight:700;padding:12px 28px;border-radius:16px">lingdongyun.website</span></div>
</body></html>"""

with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page(viewport={"width": 1200, "height": 630})
    pg.set_content(og); pg.wait_for_timeout(200)
    pg.screenshot(path=str(pub / "og-default.png"))
    for size, name in [(180, "apple-touch-icon.png"), (32, "favicon-32.png")]:
        pg = b.new_page(viewport={"width": size, "height": size})
        pg.set_content(f'<html><body style="margin:0">{logo.replace("<svg ", f"<svg width={size} height={size} ")}</body></html>')
        pg.screenshot(path=str(pub / name), omit_background=True)
    b.close()

# favicon.ico (PNG-in-ICO)
png = (pub / "favicon-32.png").read_bytes()
import struct
ico = struct.pack("<HHH", 0, 1, 1) + struct.pack("<BBBBHHII", 32, 32, 0, 0, 1, 32, len(png), 22) + png
(pub / "favicon.ico").write_bytes(ico)
(pub / "favicon-32.png").unlink()
print("ok")
