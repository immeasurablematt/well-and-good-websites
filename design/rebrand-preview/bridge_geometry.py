"""Compatibility shim for the preview and catalogue builders.

The measured bridge geometry now lives in scripts/growth_art.py, shared with
the live site build. Keep this file em-dash free.
"""
import pathlib
import sys

sys.path.insert(0, str(pathlib.Path(__file__).resolve().parents[2] / 'scripts'))

from growth_art import *  # noqa: E402,F401,F403
