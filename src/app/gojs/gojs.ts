import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as go from 'gojs';

@Component({
  selector: 'app-gojs',
  standalone: true,
  template: `<div
    #diagramDiv
    style="width:100%; height:600px; border:1px solid lightgray;"
  ></div>`,
})
export class Gojs implements OnInit {
  @ViewChild('diagramDiv', { static: true }) diagramDiv!: ElementRef;

  ngOnInit(): void {
    const $ = go.GraphObject.make;

    const diagram = $(go.Diagram, this.diagramDiv.nativeElement, {
      'undoManager.isEnabled': true,
      layout: $(go.LayeredDigraphLayout, { direction: 90 }),
    });

    // Define Node Templates
    diagram.nodeTemplateMap.add(
      'Root',
      $(
        go.Node,
        'Auto',
        $(go.Shape, 'Rectangle', { fill: '#e60073', stroke: null }),
        $(
          go.TextBlock,
          { margin: 8, font: 'bold 16px sans-serif', stroke: 'white' },
          new go.Binding('text', 'key')
        )
      )
    );

    diagram.nodeTemplateMap.add(
      'MainChild',
      $(
        go.Node,
        'Auto',
        $(go.Shape, 'Rectangle', { fill: 'orange', stroke: null }),
        $(
          go.TextBlock,
          { margin: 6, font: 'bold 14px sans-serif' },
          new go.Binding('text', 'key')
        )
      )
    );

    diagram.nodeTemplateMap.add(
      'RoundedChild',
      $(
        go.Node,
        'Auto',
        $(go.Shape, 'RoundedRectangle', {
          fill: '#f2f2f2',
          stroke: '#555',
          strokeWidth: 1.5,
          parameter1: 10,
        }),
        $(
          go.TextBlock,
          { margin: 6, font: '12px sans-serif' },
          new go.Binding('text', 'key')
        )
      )
    );

    diagram.nodeTemplateMap.add(
      'Diamond',
      $(
        go.Node,
        'Auto',
        $(go.Shape, 'Diamond', {
          fill: '#f2f2f2',
          stroke: '#555',
          strokeWidth: 1.5,
        }),
        $(
          go.TextBlock,
          { margin: 6, font: '12px sans-serif' },
          new go.Binding('text', 'key')
        )
      )
    );

    diagram.nodeTemplateMap.add(
      'Ellipse',
      $(
        go.Node,
        'Auto',
        $(go.Shape, 'Ellipse', {
          fill: '#fff',
          stroke: 'black',
          strokeWidth: 1.5,
        }),
        $(
          go.TextBlock,
          { margin: 6, font: '12px sans-serif' },
          new go.Binding('text', 'key')
        )
      )
    );

    diagram.nodeTemplateMap.add(
      'MergePoint',
      $(
        go.Node,
        'Spot',
        { width: 1, height: 1, selectable: false, pickable: false },
        $(go.Shape, 'Circle', { fill: null, stroke: null }) // invisible node
      )
    );

    // Link Templates
    diagram.linkTemplateMap.add(
      'pinkLink',
      $(
        go.Link,
        { routing: go.Link.AvoidsNodes, curve: go.Link.None, corner: 5 },
        $(go.Shape, { stroke: '#e600e6', strokeWidth: 3 }),
        $(go.Shape, { toArrow: 'Standard', stroke: '#e600e6', fill: '#e600e6' })
      )
    );

    diagram.linkTemplateMap.add(
      'grayLink',
      $(
        go.Link,
        { routing: go.Link.AvoidsNodes, curve: go.Link.Bezier },
        $(go.Shape, { stroke: 'gray', strokeWidth: 2 }),
        $(go.Shape, { toArrow: 'Standard', fill: 'gray' })
      )
    );

    diagram.linkTemplateMap.add(
      'blueLink',
      $(
        go.Link,
        { routing: go.Link.AvoidsNodes, curve: go.Link.Bezier },
        $(go.Shape, { stroke: 'blue', strokeWidth: 3 }),
        $(go.Shape, { toArrow: 'Standard', fill: 'blue' })
      )
    );

    diagram.linkTemplateMap.add(
      'straightLink',
      $(
        go.Link,
        { routing: go.Link.Normal, curve: go.Link.None },
        $(go.Shape, { stroke: 'black', strokeWidth: 2 }),
        $(go.Shape, { toArrow: 'Standard', fill: 'black' })
      )
    );

    // Data Model
    diagram.model = new go.GraphLinksModel(
      [
        { key: 'Rubiscape', category: 'Root' },
        { key: 'Rubiconnect', category: 'MainChild' },
        { key: 'Rubistudio', category: 'MainChild' },
        { key: 'Rubisight', category: 'MainChild' },
        { key: 'Workflows', category: 'RoundedChild' },
        { key: 'Workbook', category: 'RoundedChild' },
        { key: 'Dashboard', category: 'RoundedChild' },
        { key: 'Reusable Code', category: 'Diamond' },
        { key: 'Models', category: 'Ellipse' },
        { key: 'Merge', category: 'MergePoint' }, // visible merge node
      ],
      [
        { from: 'Rubiscape', to: 'Rubiconnect', category: 'pinkLink' },
        { from: 'Rubiscape', to: 'Rubistudio', category: 'pinkLink' },
        { from: 'Rubiscape', to: 'Rubisight', category: 'pinkLink' },

        { from: 'Rubistudio', to: 'Workflows', category: 'grayLink' },
        { from: 'Rubistudio', to: 'Workbook', category: 'grayLink' },
        { from: 'Rubisight', to: 'Dashboard', category: 'blueLink' },
        { from: 'Workbook', to: 'Reusable Code', category: 'grayLink' },

        // Merge behavior
        { from: 'Workflows', to: 'Merge', category: 'straightLink' },
        { from: 'Workbook', to: 'Merge', category: 'straightLink' },
        { from: 'Merge', to: 'Models', category: 'straightLink' },
      ]
    );
  }
}
