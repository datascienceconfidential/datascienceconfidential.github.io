---
layout: post
title:  "How to set up Python for machine learning on Windows 11"
subtitle: "How I learned to start worrying and stop using Anaconda"
header-img: ""
date:   2025-03-30
published: true
author: Richard
categories: python
---
If you want to get started with machine learning and data science in Python, one easy option is to use [Google Colab](https://colab.google/). But pretty soon you'll want to install Python locally so that you can easily use your own data. Many older tutorials recommend installing [Anaconda](https://www.anaconda.com/), which is a Python distribution aimed at data scientists which includes some useful libraries and gives you an easy way to manage packages and environments.

However, Anaconda is no longer a good way to go. Why? Because Anaconda has changed its terms of service twice in the last few years. each time [becoming more restrictive](https://www.cdotrends.com/story/4173/anaconda-threatens-legal-action-over-licensing-terms). (I don't know why businesses are allowed to change their terms of service and then "go after" companies for violating the new terms, but apparently they are. It seems like nobody cares about reputational risk any more?) As of writing, it's only legal to use Anaconda if you are working in a company with less than 200 employees. Later on, this might be changed to 100, or zero. There's no way of knowing. So it's better to steer clear.

Fortunately, Python is free and open source, and it's actually very easy to replicate the most useful parts of Anaconda by yourself. Here's how to do it.

First, download Python from [python.org](https://www.python.org/downloads/) and run the installer. Make sure you click the "Add Python 3.13 to PATH" option (otherwise you'll have to edit the environment variables later).

Once Python is installed on your system, open a command prompt. You can find this by searching for `cmd` in the search bar. If you want to check that Python is installed, you can type
```console
python --version
```
and you will see the Python version (mine is 3.13.2).

Now you need to install some of the most useful packages and libraries. Python has a [dependency hell](https://en.wikipedia.org/wiki/Dependency_hell) problem where packages often conflict with each other, so it's a good idea to create [virtual environments](https://docs.python.org/3/library/venv.html) for your most common tasks.

To create a new virtual environment called `ds-default`, type
```
python -m venv ds-default
```
This should create a folder inside your `C:\Users\...` directory. Activate the environment with the command
```
ds-default\Scripts\activate
```
and then install some packages.
```
pip install numpy pandas scikit-learn matplotlib seaborn jupyter
```
To check which packages are installed in your environment, you can run the command
```
pip list
```
## Launching Jupyter from the desktop
If you work in Jupyter a lot, it may be convenient to have a shortcut on the desktop so that you can launch it with a double click. To make this, create a batch file with the following contents:
```
call ds-default\Scripts\activate
call jupyter lab
pause
```
Save the file somewhere as `jupyter.bat`. You can create a batch file with any code editor, or use Notepad. In Notepad, you need to go to "Save as" and set the "Save as type" to "all files" and the file name to `"jupyter,bat"` (including the quotes, or else it will add a `.txt` extension).

However you do it, once you have your `jupyter.bat` file, right click on it and select Show more options > Create shortcut. Then move the shortcut onto your desktop. When you double click on the shortcut, a command window should open, and then Jupyter Lab will start. The `pause` command ensures that the command window stays open while Jupyter Lab is running.

If you want to make your shortcut look pretty, you can download an icon file (with `.ico` extension) and go to Properties > Shortcut > Change icon.

Now you have something to click on and launch Jupyter.
## Using VS Code
If you prefer to use Visual Studio Code rather than Jupyter lab, you need to install the Python and Jupyter extensions for VS Code, and these need to be installed *after* installing Python (you can always remove and add them again if necessary).

You won't be able to use your newly-created environment in VS Code by default. To do that, you need to open VS Code and go to Settings > (Search for `Python: Venv Folders`) > Add Item. In the list of items, add the folder with your virtual environment (example: `C:\Users\<username>\ds-default`). Then if you open a Jupyter notebook in VS Code, you should have the option of changing the notebook environment to your newly-created environment.
## Making environments selectable
When you create a new notebook in Jupyter, you have the option of choosing a kernel. The batch file you created uses the `ds-default` environment, so if you create another environment with packages specialised for some other task, it won't be visible in Jupyter Lab.

To get around this, you need to install the `ipykernel` package in each of the environments you create. After installing Jupyter, you can run the command
`python -m ipykernel install --user --name new_env --display-name "new env"`
where `new_env` is the name of your new environment and `new env` is what you want it to be called in the list of options in Jupyter. Now if you run Jupyter as before, you should be able to select `new env`.
## Why this tutorial is already obsolete
As with everything Python, the information here is already out of date. For one thing, this do-it-yourself method isn't as flexible as Anaconda (for example, it doesn't explain how to install multiple Python versions, which is often crucial because some packages will work only in one version of Python but not others). 

For another thing, there are already new tools which simplify some of this workflow. One of these is an extremely fast environment and package manager called [uv](https://github.com/astral-sh/uv) which looks like it can do everything here and more.

But for now, I'm sticking to this workflow as the simplest way to set up Python for data science on a new Windows laptop without having to use any extra tools.

