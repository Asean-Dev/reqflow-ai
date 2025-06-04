import os
import yaml  # type: ignore
from reportlab.pdfgen import canvas  # type: ignore
from reportlab.lib.pagesizes import letter  # type: ignore
from reportlab.pdfbase import pdfmetrics  # type: ignore
from reportlab.pdfbase.ttfonts import TTFont  # type: ignore


def generate_pdf(scope_summary, filename="SoW.pdf"):
    font_path = os.path.join("fonts", "Sarabun-Regular.ttf")
    pdfmetrics.registerFont(TTFont("THSarabun", font_path))

    c = canvas.Canvas(filename, pagesize=letter)
    c.setFont("THSarabun", 18)

    y = 750
    c.drawString(50, y, "Statement of Work (SoW)")
    y -= 40
    for k, v in scope_summary.items():
        c.drawString(50, y, f"{k}: {v if v else ''}")
        y -= 25
    c.save()
    return filename


def load_manday_matrix(path="manday_matrix.yml"):
    with open(path, "r") as f:
        return yaml.safe_load(f)


def calc_total_manday(matrix):
    return sum(task["manday"] for task in matrix["tasks"])
