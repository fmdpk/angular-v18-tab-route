import {Component, OnInit, OnDestroy, Input} from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TabService, Tab } from '../tab.service';
import {CdkDrag, CdkDragDrop, CdkDragStart, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';
import {TabsModule} from 'primeng/tabs';
import {FormControl} from '@angular/forms';
import {TabPanel} from 'primeng/tabview';

@Component({
  selector: 'app-tab-container',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CdkDropList, TabsModule, CdkDrag],
  templateUrl: 'tab-container.component.html',
  styleUrl: 'tab-container.component.scss',
})
export class TabContainerComponent implements OnInit, OnDestroy {
  @Input() data!: string;
  tabs: Tab[] = [];
  activeTabId: number = -1;
  activeIndex: number = 0;

  private subscriptions: Subscription[] = [];
  selected = new FormControl(0);
  selectedDragItem = new FormControl(-1);

  constructor(private tabService: TabService, private router: Router) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.tabService.tabs$.subscribe((tabs) => {
        this.tabs = [...tabs];
      }),

      this.tabService.activeTabId$.subscribe((activeTabId) => {
        this.activeTabId = activeTabId;
        this.updateActiveIndex();
      }),
    );
  }

  onTabChange(event: any): void {
    if (this.tabs[event]) {
      this.selected.setValue(+event);
      const tab = this.tabs[event];
      this.tabService.setActiveTab(tab.id);
      this.router.navigate([tab.route]);
    }
  }

  private updateActiveIndex(): void {
    const index = this.tabs.findIndex((tab) => tab.id === this.activeTabId);
    this.activeIndex = index;
    this.selected.setValue(index)
  }

  removeTab(event: MouseEvent, index: number) {
    if (this.tabs[index]) {
      this.tabService.closeTab(this.tabs[index].id);
    }
  }

  drop(event: CdkDragDrop<Tab[]>) {
    if (event.previousIndex === event.currentIndex) return;
    moveItemInArray(this.tabs, event.previousIndex, event.currentIndex);
    this.setActiveTab(event)
  }

  setActiveTab(event: CdkDragDrop<Tab[]>) {
    let selectedTabIndex = +this.selected.getRawValue()!
    this.tabService.reorderTabs(this.tabs)
    if (this.selectedDragItem.getRawValue() === this.selected.getRawValue()) {
      this.selected.setValue(+event.currentIndex);
      this.tabService.setActiveTab(+event.currentIndex)
      return;
    } else if (
      event.previousIndex < +this.selected.getRawValue()! &&
      event.currentIndex >= +this.selected.getRawValue()!
    ) {
      this.selected.setValue(selectedTabIndex - 1)
      this.tabService.setActiveTab(selectedTabIndex - 1)
      return;
    } else if (
      event.previousIndex > +this.selected.getRawValue()! &&
      event.currentIndex <= +this.selected.getRawValue()!
    ) {
      this.selected.setValue(selectedTabIndex + 1)
      this.tabService.setActiveTab(selectedTabIndex + 1)
      return;
    } else {
      return
    }
  }

  dragStarted(event: CdkDragStart<any>, index: number) {
    this.selectedDragItem.setValue(index)
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
