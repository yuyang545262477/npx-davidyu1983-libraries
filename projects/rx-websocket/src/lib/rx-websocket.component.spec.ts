import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RxWebsocketComponent } from './rx-websocket.component';

describe('RxWebsocketComponent', () => {
  let component: RxWebsocketComponent;
  let fixture: ComponentFixture<RxWebsocketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RxWebsocketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RxWebsocketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
