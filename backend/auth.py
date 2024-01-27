from flask import Blueprint, render_template

auth = Blueprint('auth', __name__)

@auth.route('/login')
def login():
    return "<p>Login</p>"

@auth.route('/logout')
def logout():
    return "<p>logout</p>"

@auth.route('/sign-up')
def sign_up():
    return "<p>Sign up</p>"

@auth.route('/toys')
def toys():
    return render_template("toys.html")

@auth.route('/TVs')
def tvs():
    return render_template("TVs.html")