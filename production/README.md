# Production

Working documents for media that is still being made. Nothing in this folder ships with the site.

```
production/<slug>/
  video-script.md   60 s script: beats with source ids, shot list, character sheet (Higgsfield)
  comic-script.md   character sheet + panel-by-panel prompts matching the legend file
```

Finished assets go to:

| Asset                                | Location                                           | Registered in                  |
| ------------------------------------ | -------------------------------------------------- | ------------------------------ |
| Portrait, comic panels, video poster | `src/assets/legends/<slug>/` (optimised at build)  | legend `media` list            |
| Video captions (`.vtt`)              | `public/media/<slug>/`                             | `video.captions`               |
| Video                                | YouTube (nocookie embed) or `public/media/<slug>/` | `video.provider` + `video.src` |

A video appears on the site only when `video.status: published`; a comic only when `comic.status` is `reviewed` or `published`.
