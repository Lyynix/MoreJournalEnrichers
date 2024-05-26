[![GitHub release (latest by SemVer and asset)](https://img.shields.io/github/downloads/Lyynix/MoreJournalEnrichers/v1.2.1/lmje-v1_2_1.zip)](https://github.com/Lyynix/MoreJournalEnrichers/releases/download/v1.2.1/manifest.json)
[![GitHub release (latest by SemVer and asset)](https://img.shields.io/github/downloads/Lyynix/MoreJournalEnrichers/v1.2.0/lmje-v1_2_0.zip)](https://github.com/Lyynix/MoreJournalEnrichers/releases/download/v1.2.0/manifest.json)
[![The Forge installs](https://img.shields.io/badge/dynamic/json?label=The%20Forge%20Installs&query=package.installs&suffix=%25&url=https%3A%2F%2Fforge-vtt.com%2Fapi%2Fbazaar%2Fpackage%2Flyynix-more-journal-enrichers&colorB=4aa94a)](https://forge-vtt.com/bazaar/package/lyynix-more-journal-enrichers)

![Banner Image of Lyynix](.github/Assets/LyynixBanner.png)
# Lyynix' More Journal Enrichers
This is a module for FoundryVTT.\
FoundryVTTs text editor natively supports the enricher `@UUID`, which is extended by enrichers like `@Scene`, `@Actor`, ...\
All of those have the same functionality: *Click to open/edit*

With More Journal Enrichers you can use similar commands to show game elements in a more usable way. 

A list of all added enrichers can be found under [Usage & Features](#usage--features).

## Tutorial videos
**VTTom** made a german review video about this module on his YouTube channel:

<a href="https://www.youtube.com/watch?v=CPnleammjAo" target="_blank"><img src="https://i3.ytimg.com/vi/CPnleammjAo/maxresdefault.jpg" width=200></a>


## Installation
<details>
  <summary>Click to reveal installation details</summary>
  You can simply use the install module screen within the FoundryVTT setup.

  Or you can paste the manifest URL in said window:

  ***Latest manifest:*** https://raw.githubusercontent.com/Lyynix/MoreJournalEnrichers/main/releases/latestManifest/manifest.json
</details>

## Example Images
<details>
  <summary>Click to reveal example images</summary>
  
  ### Table of Contents - @ToC
  ![Image of a Table of Contents](https://user-images.githubusercontent.com/12870445/277434610-aba77451-46ab-48f5-a0b3-7cd914adc0d6.png)
  
  ### Full Scene visualization - @SceneFull
  ![Image of the Scene Full Enricher](https://user-images.githubusercontent.com/12870445/277433128-6f3441e1-e091-44b7-b26e-a9e7a0061210.png)
  
  ### Full RollTable visualization - @RollTableFull
  ![Image of the RollTable Full Enricher](https://user-images.githubusercontent.com/12870445/277435825-a1e6377f-b38b-4715-be57-64a61f163888.png)
  
</details>

## Usage & Features
<details>

  <summary>Click to reveal usage instructions and a feature list</summary>

  To use any of the enrichers, write or paste the enricher into the text editor of FoundryVTT and fill in the missing elements.

  Every enricher in the following list has a link to the corresponding wiki page, where its functionality and possible restrictions are explained.

  - [Journals](https://github.com/Lyynix/MoreJournalEnrichers/wiki/Enricher_Journal)
    - `@Var` - [wiki page](https://github.com/Lyynix/MoreJournalEnrichers/wiki/Enricher_Journal#variable) - Define and use Placeholders
    - `@Page` - [wiki page](https://github.com/Lyynix/MoreJournalEnrichers/wiki/Enricher_Journal#page) - Insert content of another page
    - `@ToC` - [wiki page](https://github.com/Lyynix/MoreJournalEnrichers/wiki/Enricher_Journal#toc) - Table of contents
    - `@OrderedToC` - [wiki page](https://github.com/Lyynix/MoreJournalEnrichers/wiki/Enricher_Journal#ordered-toc) - Numbered table of contents
  - [Scenes](https://github.com/Lyynix/MoreJournalEnrichers/wiki/Enricher_Scenes)
    - `@SceneMenu` - [wiki page](https://github.com/Lyynix/MoreJournalEnrichers/wiki/Enricher_Scenes#scene-menu) - List of multiple scenes
    - `@SceneFull` - [wiki page](https://github.com/Lyynix/MoreJournalEnrichers/wiki/Enricher_Scenes#full-scene) - Single scene with image
    - `@SceneInline` - [wiki page](https://github.com/Lyynix/MoreJournalEnrichers/wiki/Enricher_Scenes#inline-scene) - Single scene to be used in text
  - [RollTable](https://github.com/Lyynix/MoreJournalEnrichers/wiki/Enricher_RollTable)
    - `@RollTableMenu` - [wiki page](https://github.com/Lyynix/MoreJournalEnrichers/wiki/Enricher_RollTable#rolltable-menu) - List of multiple rolltables
    - `@RollTableFull` - [wiki page](https://github.com/Lyynix/MoreJournalEnrichers/wiki/Enricher_RollTable#full-rolltable) - Detailed view of a rolltable
    - `@RollTableInline` - [wiki page](https://github.com/Lyynix/MoreJournalEnrichers/wiki/Enricher_RollTable#inline-rolltable) - Single rolltable to be used in text
  - [Compendium Packs](https://github.com/Lyynix/MoreJournalEnrichers/wiki/Enricher_Compendium)
    - `@CompendiumFull` - [wiki page](https://github.com/Lyynix/MoreJournalEnrichers/wiki/Enricher_Compendium#full-compendium) - Detailed view of a compendium pack
    - `@CompendiumInline` - [wiki page](https://github.com/Lyynix/MoreJournalEnrichers/wiki/Enricher_Compendium#inline-compendium) - Single compendium pack to be used in text
  - [Playlist](https://github.com/Lyynix/MoreJournalEnrichers/wiki/Enricher_Playlist)
    - `@PlaylistMenu` - [wiki page](https://github.com/Lyynix/MoreJournalEnrichers/wiki/Enricher_Playlist#playlist-menu) - List of multiple Playlist
    - `@PlaylistInline` - [wiki page](https://github.com/Lyynix/MoreJournalEnrichers/wiki/Enricher_Playlist#inline-playlist) - Single playlist to be used in text
  - [Chat](https://github.com/Lyynix/MoreJournalEnrichers/wiki/Enricher_Chat)
    - `@ChatPost` - [wiki page](https://github.com/Lyynix/MoreJournalEnrichers/wiki/Enricher_Chat#post-chat) - Text that can be postet in Chat
    - `@ChatWhisper` - [wiki page](https://github.com/Lyynix/MoreJournalEnrichers/wiki/Enricher_Chat#whisper) - Text that can be whispered to a player



  If you didn't find the functionality you were looking for, just contact me and describe what you were searching.

</details>

## Contact & Support
You need help with the module or you want to share an idea for another enricher i didn't think of?\
Contact me on discord (lyynix, formerly Lyynix#7777) or create an issue in this repository.

You can also join our Map-Making oriented [Discord Server](https://discord.gg/3fA4VGQeup). It is a german Server, but most members are able and happy to speak in english if you have something to talk about.
Also you can ping me anytime at the official (and english) [Foundry VTT Discord Server](https://discord.gg/foundryvtt).
