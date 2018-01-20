# Jasonette-Web

Jasonette-Web is an implementation of [JASON](https://docs.jasonette.com/) protocol, whose aim is to unbundle applications from devices by expressing everything in JSON, which then can be stored anywhere, transformed with any language, and transmitted anywhere, using any transport protocol.

![img](img/editor.gif)

You can build native iOS and Android apps using the JASON markup, and Jasonette-Web aims to replicate that experience on the web.

You can learn more about the iOS and Android versions at:

- Jasonette-iOS: [https://github.com/Jasonette/Jasonette-iOS](https://github.com/Jasonette/Jasonette-iOS)
- Jasonette-Android: [https://github.com/Jasonette/Jasonette-Android](https://github.com/Jasonette/Jasonette-Android)

# Demo

Just to demonstrate what's possible, here are some demos you can try right now:

- Very basic usage
  - Demo: [https://jasonette.github.io/Jasonette-Web/demo/basic/](https://jasonette.github.io/Jasonette-Web/demo/basic/)
  - Source: [demo/basic](demo/basic)
- Opening a Jason app via url fragment
  - Demo: [https://jasonette.github.io/Jasonette-Web/demo/simple/#https://jasonbase.com/things/E1bD](https://jasonette.github.io/Jasonette-Web/demo/simple/#https://jasonbase.com/things/E1bD)
  - Source: [demo/simple](demo/simple)
- Realtime Jasonette Editor
  - Demo: [https://jasonette.github.io/Jasonette-Web/demo/ipfs/](https://jasonette.github.io/Jasonette-Web/demo/ipfs/)
  - Source: [demo/ipfs](demo/ipfs)
- Multiple draggable components
  - Demo: [https://jasonette.github.io/Jasonette-Web/demo/multiple/](https://jasonette.github.io/Jasonette-Web/demo/multiple/)
  - Source: [demo/multiple](demo/multiple)

# Features

JASON has a lot of things going on, and we can't support everything from the beginning.

## What Jasonette-Web supports

In terms of MVC (Model View Controller paradigm), the first version of Jasonette-Web implements MV (Model and View). This means it includes:

1. Rendering of all the view components
2. Dynamic rendering of inline data (under `$jason.head.data`) using templates (under `$jason.head.templates`)
3. Mixins

## What Jasonette-Web doesn't support (yet)

It doesn't yet implement the "Controller" part, which means it doesn't yet implement:

1. Actions: This means you can't do things like `$network.request` or `$require`. However you CAN use mixins to fetch remote JSON instead, which is better.

# Installation

- 2 Dependencies: `cell.js` and `st.js`
- Core: `jason.js` and `jason.css`

```
<script src="https://www.celljs.org/cell.js"></script>
<script src="https://selecttransform.github.io/st.js/st.js"></script>
<script src="https://jasonette.github.io/Jasonette-Web/dist/jason.js"></script>
<link href="https://jasonette.github.io/Jasonette-Web/dist/jason.css" rel="stylesheet">
```

# Usage

## Syntax

### 1. Initialize

```
var app = Jason([Custom DOM attributes], [JASON markup])
```

- **Custom DOM attributes**: Pass in HTML node attributes to customize the root node. All [HTML attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes#Attribute_list) can be specified to customize your own
- **JASON markup**: Any JASON markup you wish to instantiate the component with. You can also dynamically fetch content and fill it in later instead of passing this parameter.

### 2. Refresh

Once initialized, you can refresh the component's content by:

1. Selecting the element
2. Calling `_update([JASON markup])` on it

Example:

```
var app = Jason({id: "jason", $cell: true})
...
document.querySelector("#jason")._update({
  $jason: {
    head: {
      title: "hello"
    },
    "body": {
      "sections": [{ ... }]
    }
  }
})
```

**Warning: Note that you MUST assign the `Jason()` result to a global variable to make sure it renders.**

## Quickstart

You can create a Jason View using the following method:

## 1. Basic

See it in action at [demo/basic](https://jasonette.github.io/Jasonette-Web/demo/basic/)

```
var app = Jason({
  $cell: true,
  style: {
    width: "400px",
    margin: "0 auto"
  }
}, {
  "$jason": {
    "head": {
      "title": "Basic"
    },
    "body": {
      "header": {
        "title": "Basic Example"
      },
      "sections": [{
        "items": [{
          "type": "label",
          "style": {
            "padding": "10"
          },
          "text": "Item 1"
        }]
      }]
    }
  }
})
```

## 2. Custom

Customize the attributes of the root Jason node by passing HTML attributes:

```
var app = Jason({$cell: true, id: "some_id", class: "col-6"})
```

Any [HTML attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes#Attribute_list) can be specified to customize your own

## 3. Advanced

The `$cell: true` comes from [cell.js](https://www.celljs.org) and it turns a JSON object into an HTML node. You must pass `$cell:true` to render the markup into the DOM.

However sometimes you may want to just generate a JASON markup WITHOUT turning it into a node. This may be the case when you want to compose the component into a larger app, or could be that you want to dynamically plug it in instead of immediately loading the component.

In this case you just don't pass the `$cell: true` and store the variable. Then later you can use it.

```
var component1 = Jason();
var component2 = Jason();
var app = {
  $cell: true,
  $components: [component1, component2]
}
```

You can see more on this in the ["multiple" demo](demo/multiple) code

# What you can do with Jasonette-Web

Even without actions you can do a lot of things.

## 1. Editor

You can use this as a realtime Jasonette editor.

![img](img/editor.gif)

Try the demo at [demo/ipfs](https://jasonette.github.io/Jasonette-Web/demo/ipfs/)

---

## 2. Plugin

Jasonette-Web is built on top of [cell.js](https://www.celljs.org), which lets you describe an entire web app purely in JavaScript objects, with no HTML tags or no weird build tools and processes.

Therefore the Jasonette-Web component is instantly pluggable into any environment with ZERO hassle (No build steps. Literally just need to include 1 JS and 1 CSS file)

Here's an example where a single page has 4 Jason components. Since each component is completely containerized thanks to cell.js, you can even drag and drop them anywhere simply using a drag and drop API.

Try the demo at [demo/multiple](https://jasonette.github.io/Jasonette-Web/demo/multiple/)

![img](img/multiple.gif)

---

## 3. Mixins

The mixins feature is very powerful because you can load remote JSON in realtime. Used with inline data rendering, you don't need to do `$network.request` or `$require` to render external content. Here's an example:

```
{
  "$jason": {
    "head": {
      "title": "Example",
      "data": {
        "remote_items": {
          "@": "https://jasonbase.com/things/oXLK"
        }
      },
      "templates": {
        "body": {
          "sections": [{
            "items": {
              "{{#each remote_items}}": {
                ...
              }
            }
          }]
        }
      }
    }
  }
}
```


The mixin will automatically fetch the remote JSON url and it will be immediately accessible under the variable `remote_items` throughout the template parsing process.

To learn more about mixins, see: 

- Documentation: [http://docs.jasonette.com/mixin/](http://docs.jasonette.com/mixin/)
- Remote Mixins Tutorial: [http://blog.jasonette.com/2017/02/27/mixins/](http://blog.jasonette.com/2017/02/27/mixins/)
- Self Mixins Tutorial: [http://blog.jasonette.com/2017/03/02/self-mixin/](http://blog.jasonette.com/2017/03/02/self-mixin/)

---

<br>

# Contribution

Anyone is welcome to contribute to the project. Here's how the project is structured:

## Repository Structure

1. `src` folder is all you need to look at. That's what contains all the files.
2. `dist` folder is simply just a conatentation of JS files in the `src` folder so that it's easier to use (include one JS instead of multiple)
3. The `dist` folder is generated by running `gulp`. You will see in `gulpfile` that all it does is generate a concatenated JS and copy the JS and CSS into dist.

## How the code works

### 2 main dependencies

Jasonette-Web is built on top of two main libraries:

1. Cell.js: [https://www.celljs.org](https://www.celljs.org)
2. ST.js: [https://selecttransform.github.io/site/](https://selecttransform.github.io/site/)

#### Cell.js

To understand how the code works, you first need to understand how [cell.js](https://www.celljs.org) works. 

But don't worry, cell.js is a framework built to be intentionally simple and there are only 3 rules to remember, so it should take about 5 to 10 minutes to get started.

#### ST.js

ST.js is the main template engine that powers both Jasonette-iOS and Jasonette-Android, and now Jasonette-Web.

This library plays a great role in Jasonette since this is how most of the JSON transformation is carried out in Jasonette ecosystem.

Check out the documentation at [https://selecttransform.github.io/site/](https://selecttransform.github.io/site/)

## Project Structure

Now that we've gotten the basics out of the way, here's how the project is structured:

### Level 1: App

**app.js**: This is the starting point of the app. It creates the root node that contains everything else.

### Level 2: Top level view elements

Top top level view elements of Jasonette are:

#### 1. Header

Documentation: [http://docs.jasonette.com/document/#header](http://docs.jasonette.com/document/#header)

Implementation: [header.js](src/header.js)

#### 2. Sections

Documentation: [http://docs.jasonette.com/document/#bodysections](http://docs.jasonette.com/document/#bodysections)

Implementation: [sections.js](src/sections.js)

#### 3. Layers

Documentation: [http://docs.jasonette.com/document/#bodylayers](http://docs.jasonette.com/document/#bodylayers)

Implementation: [layers.js](src/layers.js)

#### 4. Footer

Documentation: [http://docs.jasonette.com/document/#bodyfooter](http://docs.jasonette.com/document/#bodyfooter)

Implementation: [footer.js](src/footer.js)

### Level 3. Items, Layouts and Components

#### Hierarchy

Each section can contain:

- 1 `header`
- Multiple `items`

Both a header and an item can be either

- a layout
- a component

A layout can contain

- multiple layouts
- multiple components
- mix of multiple layouts and multiple components

#### Implementation

- Header Implementation: [section.js](src/section.js) at `Section.header`.
- Items Implementation: [section.js](src/section.js) at `Section.items`.

---

- Layout Implementation: [item.js](src/item.js) at `Item.layout`
- Components Implementation: [item.js](src/item.js) at `Item.components`

---

- Each custom components implementation (such as label, image, button, etc): [components.js](src/components.js)
