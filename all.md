---
title: All pages
layout: page
type_label: Index
toc: false
permalink: /all/
---

{% assign all = site.arts | concat: site.topics | concat: site.people | concat: site.sources | sort: 'title' %}

<div class="indexGrid">
  {% for p in all %}
    <a class="indexCard" href="{{ p.url | relative_url }}">
      <div class="indexTitle">{{ p.title }}</div>
      <div class="indexMeta">{{ p.collection | capitalize }}{% if p.last_edited %} · {{ p.last_edited }}{% endif %}</div>
      <div class="indexTags">{% for t in p.tags %}<span class="tag">{{ t }}</span>{% endfor %}</div>
    </a>
  {% endfor %}
</div>
