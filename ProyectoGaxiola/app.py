from flask import Flask, render_template

app = Flask(__name__, static_folder='static', template_folder='templates')

@app.route('/')
def home():
    return render_template('conversor.html')  # Nombre de tu archivo HTML principal

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)