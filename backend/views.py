from flask import Blueprint, render_template
from summarize import summarize_message
from imageGen import generate_image

views = Blueprint('views', __name__)

@views.route('/')
def home():
    input_topic = "shrek"
    summary = summarize_message(input_topic)
    image_url = generate_image(input_topic)
    return render_template("home.html", summary = summary, image_url = image_url)