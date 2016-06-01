import win32api, win32con, win32gui, sys
from flask import Flask, send_from_directory, request

def click():
    (x,y) = win32gui.GetCursorPos()
    win32api.mouse_event(win32con.MOUSEEVENTF_LEFTDOWN,x,y,0,0)
    win32api.mouse_event(win32con.MOUSEEVENTF_LEFTUP,x,y,0,0)

def rclick():
    (x,y) = win32gui.GetCursorPos()
    win32api.mouse_event(win32con.MOUSEEVENTF_RIGHTDOWN,x,y,0,0)
    win32api.mouse_event(win32con.MOUSEEVENTF_RIGHTUP,x,y,0,0)

def move(xx,yy):
    (x,y) = win32gui.GetCursorPos()
    win32api.SetCursorPos((x+int(xx),y+int(yy)))

def scroll(yy):
    (x,y) = win32gui.GetCursorPos()
    win32api.mouse_event(win32con.MOUSEEVENTF_WHEEL, x, y, yy, 0)

app = Flask(__name__)
  
@app.route("/")
def index():
    return send_from_directory('', 'index.html')

@app.route("/move")
def mPage():
    move(request.args.get('x'),request.args.get('y'))
    return ""

@app.route("/click")
def cPage():
    click()
    return ""

@app.route("/rclick")
def rPage():
    rclick()
    return ""

@app.route("/scroll")
def sPage():
    scroll(int(request.args.get('y')))
    return ""

@app.route('/js/<path:path>')
def send_js(path):
    return send_from_directory('js', path)

if __name__ == "__main__":
    app.debug = True
    app.run(host="0.0.0.0",port=80)
