import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as go from 'gojs';

@Component({
  selector: 'app-gojs',
  standalone: true,
  templateUrl: './gojs.html',
  styleUrls: ['./gojs.css'],
})
export class Gojs implements OnInit {
  @ViewChild('diagramDiv', { static: true }) diagramDiv!: ElementRef;

  ngOnInit(): void {
    const $ = go.GraphObject.make;

    const diagram = $(go.Diagram, this.diagramDiv.nativeElement, {
      'undoManager.isEnabled': true,
      layout: $(go.TreeLayout, { angle: 90 }),
    });

    // Custom node templates by category
    diagram.nodeTemplateMap.add(
      'Root',
      $(
        go.Node,
        'Auto',
        $(go.Shape, 'Rectangle', { fill: 'pink', strokeWidth: 0 }),
        $(
          go.TextBlock,
          { margin: 8, font: 'bold 14px sans-serif' },
          new go.Binding('text', 'key')
        )
      )
    );

    diagram.nodeTemplateMap.add(
      'MainChild',
      $(
        go.Node,
        'Auto',
        $(go.Shape, 'Rectangle', { fill: 'yellow', strokeWidth: 0 }),
        $(
          go.TextBlock,
          { margin: 8, font: 'bold 14px sans-serif' },
          new go.Binding('text', 'key')
        )
      )
    );

    diagram.nodeTemplateMap.add(
      'RoundedChild',
      $(
        go.Node,
        'Auto',
        $(go.Shape, 'RoundedRectangle', { fill: 'lightgrey', strokeWidth: 0 }),
        $(
          go.TextBlock,
          { margin: 8, font: 'bold 12px sans-serif' },
          new go.Binding('text', 'key')
        )
      )
    );

    diagram.nodeTemplateMap.add(
      'Diamond',
      $(
        go.Node,
        'Auto',
        $(go.Shape, 'Diamond', { fill: 'lightgrey', strokeWidth: 0 }),
        $(
          go.TextBlock,
          { margin: 8, font: 'bold 12px sans-serif' },
          new go.Binding('text', 'key')
        )
      )
    );

    // Link templates
    diagram.linkTemplateMap.add(
      'pinkLink',
      $(
        go.Link,
        { routing: go.Link.Orthogonal, corner: 5 },
        $(go.Shape, { stroke: 'deeppink', strokeWidth: 2, toArrow: 'Standard' })
      )
    );

    diagram.linkTemplateMap.add(
      'grayLink',
      $(
        go.Link,
        { curve: go.Link.Bezier },
        $(go.Shape, { stroke: 'gray', strokeWidth: 2, toArrow: 'Standard' })
      )
    );

    diagram.linkTemplateMap.add(
      'blueLink',
      $(
        go.Link,
        { curve: go.Link.Bezier },
        $(go.Shape, { stroke: 'blue', strokeWidth: 2, toArrow: 'Standard' })
      )
    );

    // Model data
    diagram.model = new go.GraphLinksModel(
      [
        { key: 'Rubiscape', category: 'Root' },
        { key: 'Rubistudio', category: 'MainChild' },
        { key: 'Rubisight', category: 'MainChild' },
        { key: 'Rubiconnect', category: 'MainChild' },
        { key: 'Workflows', category: 'RoundedChild' },
        { key: 'Workbook', category: 'RoundedChild' },
        { key: 'Dashboard', category: 'RoundedChild' },
        { key: 'Reusable Code', category: 'Diamond' },
        { key: 'Models', category: 'RoundedChild' },

        // Invisible join node to merge Workflows and Workbook
        { key: 'JoinNode', category: 'Join' },
      ],
      [
        { from: 'Rubiscape', to: 'Rubistudio', category: 'pinkLink' },
        { from: 'Rubiscape', to: 'Rubisight', category: 'pinkLink' },
        { from: 'Rubiscape', to: 'Rubiconnect', category: 'pinkLink' },
        { from: 'Rubistudio', to: 'Workflows', category: 'grayLink' },
        { from: 'Rubistudio', to: 'Workbook', category: 'grayLink' },
        { from: 'Rubisight', to: 'Dashboard', category: 'blueLink' },
        { from: 'Workbook', to: 'Reusable Code', category: 'grayLink' },

        // Converging arrows to join node
        { from: 'Workflows', to: 'JoinNode', category: 'straightLink' },
        { from: 'Workbook', to: 'JoinNode', category: 'straightLink' },

        // Final arrow to Models
        { from: 'JoinNode', to: 'Models', category: 'straightLink' },
      ]
    );
  }
}
