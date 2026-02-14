---
title: Random
layout: default
permalink: /random/
---
<script>
  fetch("{{ '/search.json' | relative_url }}")
    .then(r => r.json())
    .then(idx => {
      const pick = idx[Math.floor(Math.random()*idx.length)];
      if (pick && pick.url) location.href = pick.url;
      else location.href = "{{ '/' | relative_url }}";
    })
    .catch(() => location.href = "{{ '/' | relative_url }}");
</script>
