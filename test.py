from unittest import TestCase
from app import app
from flask import session
from boggle import Boggle


class FlaskTests(TestCase):

    def test(self):
        with app.test_client() as client:
            res = client.get("/")
            self.assertEqual(res.status_code, 200)
            self.assertIn("board", session)
            self.assertEqual(session.get("highscore"), None)
            self.assertEqual(session.get("times_played"), None)

            


