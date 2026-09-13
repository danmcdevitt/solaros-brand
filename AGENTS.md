# Solaros: start here

This repository is the public brand and implementation foundation. Its files are generated from the maintained brand source. Do not edit generated deliveries or treat them as a complete graphic-design library.

## Choose the task before loading context

| Task | Public context | Additional context |
| --- | --- | --- |
| Website or product implementation | design.md, solaros-web.css, DECISIONS.md | The application's own requirements and accessibility rules |
| Fixed-canvas implementation | design.md, solaros-canvas.css, DECISIONS.md | Target dimensions; the supplied canvas delivery is for its documented basis, not every poster ratio |
| Non-DOM rendering | design.md, solaros-tokens.json or solaros-tokens.toml | Generator-specific mapping and the requested output |
| Poster, deck, infographic or visual direction | Relevant public brand guidance and tokens | Authorised private design companion: composition rules, selected examples, asset catalogue and recipes |
| Image generation | Relevant public brand constraints | A task brief and only the selected private references authorised for that generation |
| Paper assembly | Relevant public values | Private layer instructions, content, asset IDs, output dimensions and composition reference |
| Review | The brief and relevant public rules | The result and authorised private reference examples for that task |

Read design.md before composing. Bind to delivered tokens; do not copy values into a new independent palette. Preserve delivery version/provenance. Missing canon values remain unresolved; do not guess them.

## Private resources across machines

An authorised local design companion may be configured with the environment variable SOLAROS_DESIGN_ROOT. If set, read its AGENTS.md, then load only the resources for the task. This variable points to a local checkout; it supplies no credentials and grants no access itself.

If the task requires private resources and the companion is absent, state the missing resource and request its authorised location. Continue only work that does not depend on it. Do not replace missing approved artwork with invented artwork, or claim public CSS alone reproduces the visual system.

## Contributing

Changes are proposed as GitHub issues on the private canon repository, by invitation. Contact Dan.

## Distribution boundary

Do not commit or upload Paper files, private design elements, reference images, effect masters, prompts, local configuration or private resource links to this repository. Do not bulk-send a private library to an image provider. Design selection and permission to distribute are separate decisions.

Private production choices do not silently amend public canon. If the two conflict, report the specific conflict and its scope before applying it outside the private task.
