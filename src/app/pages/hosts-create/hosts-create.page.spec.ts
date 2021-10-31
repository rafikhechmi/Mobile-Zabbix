import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HostsCreatePage } from './hosts-create.page';
import {NewHostPage} from '../new-host/new-host.page';

describe('HostsCreatePage', () => {
  let component: HostsCreatePage;
  let fixture: ComponentFixture<HostsCreatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HostsCreatePage , NewHostPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostsCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
