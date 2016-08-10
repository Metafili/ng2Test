import { Component, OnInit,
  trigger,
  state,
  style,
  transition,
  group,
  animate } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-animation',
  templateUrl: 'animation.component.html',
  styleUrls: ['animation.component.css'],
  animations: [
    trigger('scaleUp', [
      state('inactive', style({
        backgroundColor: '#eee',
        transform: 'scale(1)'
      })),
      state('active',   style({
        backgroundColor: '#cfd8dc',
        transform: 'scale(1.1)'
      })),
      transition('inactive <=> active', animate('100ms ease-in')),
      // transition('active => inactive', animate('100ms ease-out'))
    ]),
    trigger('flyInOut', [
      state('in', style({opacity: 1, transform: 'translateX(0)'})),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-100%)'
        }),
        animate('0.3s ease-in')
      ]),
      transition('* => void', [
        animate('0.3s 10 ease-out', style({
          opacity: 0,
          transform: 'translateX(-100%)'
        }))
      ])
    ]),
    trigger('heroState', [
      state('inactive', style({transform: 'translateX(0) scale(1)'})),
      state('active',   style({transform: 'translateX(0) scale(1.1)'})),
      transition('inactive => active', animate('100ms ease-in')),
      transition('active => inactive', animate('100ms ease-out')),
      transition('void => inactive', [
        style({transform: 'translateX(-100%) scale(1)'}),
        animate(100)
      ]),
      transition('inactive => void', [
        animate(100, style({transform: 'translateX(100%) scale(1)'}))
      ]),
      transition('void => active', [
        style({transform: 'translateX(0) scale(0)'}),
        animate(200)
      ]),
      transition('active => void', [
        animate(200, style({transform: 'translateX(0) scale(0)'}))
      ])
    ]),
    trigger('shrinkOut', [
      state('in', style({height: '*'})),
      transition('* => void', [
        style({height: '*'}),
        animate(250, style({height: 0}))
      ])
    ]),
    trigger('parallelInOut', [
      state('in', style({width: 120, transform: 'translateX(0)', opacity: 1})),
      transition('void => *', [
        style({width: 10, transform: 'translateX(50px)', opacity: 0}),
        group([
          animate('0.3s 0.1s ease', style({
            transform: 'translateX(0)',
            width: 120
          })),
          animate('0.3s ease', style({
            opacity: 1
          }))
        ])
      ]),
      transition('* => void', [
        group([
          animate('0.3s ease', style({
            transform: 'translateX(50px)',
            width: 10
          })),
          animate('0.3s 0.2s ease', style({
            opacity: 0
          }))
        ])
      ])
    ])
  ]
})
export class AnimationComponent implements OnInit {

  aniMode:string ="inactive";
  showFly:boolean = true;
  showShrink:boolean = true;
  showParallel:boolean = true;

  constructor() {}

  ngOnInit() {
  }

  aniActiveMode(aniMode:string) {
    this.aniMode = aniMode;
    if( this.aniMode === "active" )
      this.aniMode = "inactive";
    else
      this.aniMode = "active"
    console.log("aniMode: " + this.aniMode );
  }

  aniHeroMode(aniMode:string) {
    this.aniMode = aniMode;
    console.log("aniMode: " + this.aniMode );
  }

  aniFlyMode(aniMode:string) {
    this.aniMode = aniMode;
    this.showFly = !this.showFly;
    console.log("aniMode: " + this.aniMode );
  }

  aniShrinkMode(aniMode:string) {
    this.aniMode = aniMode;
    this.showShrink = !this.showShrink;
    console.log("aniMode: " + this.aniMode );
  }

  aniParallelMode(aniMode:string) {
    this.aniMode = aniMode;
    this.showParallel = !this.showParallel
    console.log("aniMode: " + this.aniMode );
  }
}
