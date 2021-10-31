import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphsPagesPage } from './graphs-pages.page';

describe('GraphsPagesPage', () => {
  let component: GraphsPagesPage;
  let fixture: ComponentFixture<GraphsPagesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphsPagesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphsPagesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
