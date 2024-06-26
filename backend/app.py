from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:tiger@localhost/flask'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)

class Tasks(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100))
    description = db.Column(db.Text())
    date = db.Column(db.DateTime, default=datetime.now)
    status = db.Column(db.String(20), default="Pending")
     
    def __init__(self, title, description, status="Pending"):
        self.title = title
        self.description = description
        self.status = status

class TaskSchema(ma.Schema):
    class Meta:
        fields = ('id', 'title', 'description', 'status', 'date')

task_schema = TaskSchema()
tasks_schema = TaskSchema(many=True)

@app.route('/', methods=['GET'])
def get_tasks():
    all_tasks = Tasks.query.all()
    results = tasks_schema.dump(all_tasks)
    return jsonify(results)

@app.route('/get/<id>/', methods=['GET'])
def post_details(id):
    task = Tasks.query.get(id)
    return task_schema.jsonify(task)

@app.route('/add', methods=['POST'])
def add_task():
    title = request.json['title']
    description = request.json['description']
    status = request.json.get('status', 'Pending')

    task = Tasks(title, description, status)
    db.session.add(task)
    db.session.commit()
    return task_schema.jsonify(task)

@app.route('/update/<id>/', methods=['PUT'])
def update_task(id):
    task = Tasks.query.get(id)

    title = request.json['title']
    description = request.json['description']
    status = request.json.get('status', task.status)

    task.title = title
    task.description = description
    task.status = status

    db.session.commit()
    return task_schema.jsonify(task)

@app.route('/delete/<id>/', methods=['DELETE'])
def delete_task(id):
    task = Tasks.query.get(id)
    db.session.delete(task)
    db.session.commit()

    return task_schema.jsonify(task)

if __name__ == "__main__":
    app.run(debug=False)
