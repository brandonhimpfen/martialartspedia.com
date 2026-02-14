---
title: People
layout: page
type_label: Index
toc: false
permalink: /people/
---

{% assign items = site.people | sort: 'title' %}

<div class="indexGrid">
  {% for p in items %}
    <a class="indexCard" href="{{ p.url | relative_url }}">
      <div class="indexTitle">{{ p.title }}</div>
      <div class="indexMeta">{{ p.last_edited | default: '' }}</div>
      <div class="indexTags">
        {% for t in p.tags %}<span class="tag">{{ t }}</span>{% endfor %}
      </div>
    </a>
  {% endfor %}
</div>
