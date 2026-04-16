from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    CORS(
        app,
        resources={r"/*": {"origins": [
            "http://localhost:3000",
            "https://cognitive-omega.vercel.app"
        ]}},
        supports_credentials=True
    )

    app.config['SECRET_KEY'] = 'your_secret_key'

    from app.routes.chat import chat_bp
    from app.routes.prediction import prediction_bp
    from app.routes.recommendation import recommendation_bp
    from app.routes.assessment import assessment_bp

    app.register_blueprint(chat_bp, url_prefix="/chat")
    app.register_blueprint(prediction_bp)
    app.register_blueprint(recommendation_bp)
    app.register_blueprint(assessment_bp)

    return app