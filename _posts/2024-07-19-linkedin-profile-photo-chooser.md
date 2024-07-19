---
layout: post
title: "Using open source AI to choose a LinkedIn profile photo"
subtitle: ""
header-img: "/blog/images/2024/post_img_small.png"
date: 2024-07-19
author: Richard
categories: python ai llm
published: true
---
The job market, which [I predicted was going to improve by early 2024](https://datascienceconfidential.github.io/bayesian/2023/05/19/tech-layoff-epidemic.html), is [worse than ever right now](https://datascienceconfidential.github.io/bayesian/2024/03/19/layoffs-revisited.html). But maybe polishing up my LinkedIn profile will help? I decided to take a new profile photo, but I was unable to decide whether it was an improvement over the old one. How to make a choice? We're told that AI is supposed to be capable of doing all our jobs, so perhaps it can help me?

What I want is some sort of tool which allows me to upload a photo and get a measure of how appropriate it is for LinkedIn. I didn't see any obvious way to do this with the tools available to me, but a [langchain video](https://www.youtube.com/watch?v=UoUS6F7Jfos) on converting a photo to speech gave me an idea. I thought that I could adapt their method to convert a photo to a sentiment score. The basic workflow is:

1. Convert the photo into a short text description using image recognition.
2. Convert the short text description into a longer or more elaborate text description using an LLM.
3. Evaluate the sentiment of the resulting text.

For example, let's say that you look grumpy in your profile photo. The image recognition AI might output the description "A frowning face". This might not be enough to extract some sentiment, so the LLM can be used to get a longer piece of text, for example: "The woman was frowning. She was puzzled about something. She was having a terrible day." Then the sentiment analysis could be run on this piece of text. The presence of words like "terrible" would lead it to evaluate the sentiment as negative. So you wouldn't choose this profile picture. That's the theory.

## Step 1: Image recognition

Here is the code to convert an image to text:

```python
from transformers import pipeline
from langchain import LLMChain, PromptTemplate
from langchain import HuggingFaceHub
from langchain_huggingface import HuggingFaceEndpoint
import matplotlib.pyplot as plt
import os
import urllib.request 
from PIL import Image 

def img2text(url):
  pipe = pipeline("image-to-text", model="Salesforce/blip-image-captioning-base", max_new_tokens=100, device=0)
  # device = 0 can be omitted if you want to run it on the CPU
  return pipe(url)[0]["generated_text"]
```
  
It works fine. For example, it correctly recognises this photo of a penguin (by Glenda Rees).

<center><div style="width:70%; margin:0 auto;">
 <img src="/blog/images/2024/4701062X2A1697 King Penguin bol.jpg" />
</div></center>

```python
img_path = r"https://nzbirdsonline.org.nz/sites/all/files/2X2A1697%20King%20Penguin%20bol.jpg"
description = img2text(img_path)
description

# 'a penguin standing on a beach with a white background'
```

## Step 2: use an open-source LLM to expand a description into a story

Here, you need your own [huggingface token](https://huggingface.co/docs/hub/en/security-tokens). I had to change the code from the video slightly because langchain has been updated in the meantime.

```python
repo_id = "tiiuae/falcon-7b-instruct"

hf_token = MY_TOKEN

llm = HuggingFaceEndpoint(huggingfacehub_api_token = hf_token,
                     repo_id = repo_id,
                     verbose = False,
                     temperature = 0.7, 
                     max_new_tokens = 1500)
                     
# from langchain tutorial https://www.youtube.com/watch?v=UoUS6F7Jfos
def generate_story(scenario, llm):
  template = """You are a story teller.
  You get a scenario as input text and generate a story out of it.
  Context : {scenario}
  Story:"""
  prompt = PromptTemplate(template=template, input_variables=["scenario"])
  chain = LLMChain(prompt = prompt, llm = llm)
  story = chain.predict(scenario = scenario)
  return story
```

And here's how it works.

```python
story = generate_story(description, llm)
story

# '\nThe penguin was standing on a white beach, feeling a little lonely. He had no one to talk to and all the other penguins had already gone home. He decided to take a walk along the shore and enjoy the peaceful silence. As he walked, he stumbled upon a small child playing in the sand. They became friends and the penguin was no longer lonely. They spent the rest of the afternoon playing and enjoying the beach together.'
```

## Step 3: Analyse the sentiment of the story

```python
sentiment_pipeline = pipeline("sentiment-analysis", model="distilbert/distilbert-base-uncased-finetuned-sst-2-english", device=0)
```

Evaluated on the penguin story:

```python
sentiment_pipeline(story)
# [{'label': 'POSITIVE', 'score': 0.9955536723136902}]
```

So the conclusion is that this is a positive penguin photo.

## Step 4: Test it on my photos

I put the code together into a function.

```python
def image_sentiment(img_path):
  description = img2text(img_path)
  story = generate_story(description, llm)
  sentiment =  sentiment_pipeline(story)
  
  for x in sentiment:
    if 'NEGATIVE' in x['label']:
      out = -x['score']
    else:
      out = x['score']
  
  return out
```

My current profile photo:

```python
image_sentiment("current_linkedin_profile_photo.jpg")
# 0.9998325109481812
```

The challenger, `headshot3.jpg`:

```python
image_sentiment("headshot3.jpg")
# -0.9957653284072876
```

The current photo wins! I was very surprised that it didn't like my "power pose", so I decided to dig deeper.

```python
imgfile = "headshot3.jpg"
img = Image.open(imgfile) 
description = img2text(img)
story = generate_story(description, llm)
description, story
```

> a man in a suit and tie standing with his arms crossed

> The man in the suit and tie was feeling lost. He had just received a promotion at work but had no idea what to do with the newfound power. He had been toiling away for years and now suddenly he was in a position of power, yet he was unsure of how to use it. He stood there, arms crossed, trying to figure out his next move. He was unsure of his own path in life, and the suit and tie he now wore only served to remind him of his newfound power and the responsibility that came with it. He had to decide what to do now, and he was unsure of himself.

This really cuts, but also I must point out that I wasn't even wearing a tie, so I don't know where it got that from.

I did use rather a high temperature here of `0.7` and the results vary quite a bit with different model runs. Nevertheless, the current photo (allegedly "a man sitting at a a table with a plate of food") usually comes out on top, so perhaps I should look for professional photo-taking help. On the other hand, it could be that I simply didn't choose a very good image recognition algorithm. I tried it out on some famous photos like [*The Vulture and Little Girl*](https://en.wikipedia.org/wiki/The_Vulture_and_the_Little_Girl) and it didn't seem to recognise what was in the photos at all. 

The LLM also has a tendency to write over-optimistic or happy stories. I tried it out on some neutral photos, like a close-up of a beige colour swatch, and it produced sentiment scores of around 0.999.

Neverthless, [as I have said before](https://datascienceconfidential.github.io/python/llm/chatgpt/nlp/2024/02/06/olmo.html), I do think that open source AI is a good thing, and that it has some advantages beyond just being free to use. Maybe state-of-the-art paywalled algorithms would have worked better on my problem. But, if the result is entirely subjective, as it is in this example, who can really say?
