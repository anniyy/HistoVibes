from flask import Flask, render_template, url_for

def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'fsduibfuyewbef'

    from views import views
    from auth import auth

    app.register_blueprint(views, url_prefix = '/')
    app.register_blueprint(auth, url_prefix = '/')

    return app

app = create_app()

@app.route('/')
def index():
    return render_template('home.html')

if __name__ == '__main__':
    app.run(debug=True)