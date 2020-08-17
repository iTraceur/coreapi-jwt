import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import * as i0 from "@angular/core";
export class GlobalState {
    constructor() {
        this._data = new Subject();
        this._dataStream$ = this._data.asObservable();
        this._subscriptions = new Map();
        this._dataStream$.subscribe((data) => this._onEvent(data));
    }
    notifyDataChanged(event, value, force = false) {
        const current = this._data[event];
        if (current !== value || force) {
            this._data[event] = value;
            this._data.next({
                event: event,
                data: this._data[event],
            });
        }
    }
    subscribe(event, callback) {
        const subscribers = this._subscriptions.get(event) || [];
        subscribers.push(callback);
        this._subscriptions.set(event, subscribers);
    }
    _onEvent(data) {
        const subscribers = this._subscriptions.get(data['event']) || [];
        subscribers.forEach((callback) => {
            callback.call(null, data['data']);
        });
    }
}
GlobalState.ɵfac = function GlobalState_Factory(t) { return new (t || GlobalState)(); };
GlobalState.ɵprov = i0.ɵɵdefineInjectable({ token: GlobalState, factory: GlobalState.ɵfac });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(GlobalState, [{
        type: Injectable
    }], function () { return []; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xvYmFsLnN0YXRlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vY29yZWFwaS1wcm94eS8iLCJzb3VyY2VzIjpbImxpYi9nbG9iYWwuc3RhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sY0FBYyxDQUFDOztBQUd2QyxNQUFNLE9BQU8sV0FBVztJQU90QjtRQUxRLFVBQUssR0FBRyxJQUFJLE9BQU8sRUFBVSxDQUFDO1FBQzlCLGlCQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUV6QyxtQkFBYyxHQUFpQyxJQUFJLEdBQUcsRUFBMkIsQ0FBQztRQUd4RixJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFFRCxpQkFBaUIsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssR0FBRyxLQUFLO1FBQzNDLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbEMsSUFBSSxPQUFPLEtBQUssS0FBSyxJQUFJLEtBQUssRUFBRTtZQUM5QixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQztZQUUxQixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztnQkFDZCxLQUFLLEVBQUUsS0FBSztnQkFDWixJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7YUFDeEIsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDO0lBRUQsU0FBUyxDQUFDLEtBQWEsRUFBRSxRQUFrQjtRQUN6QyxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDekQsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUUzQixJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVELFFBQVEsQ0FBQyxJQUFTO1FBQ2hCLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUVqRSxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7WUFDL0IsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDcEMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOztzRUFwQ1UsV0FBVzttREFBWCxXQUFXLFdBQVgsV0FBVztrREFBWCxXQUFXO2NBRHZCLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcy9TdWJqZWN0JztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEdsb2JhbFN0YXRlIHtcblxuICBwcml2YXRlIF9kYXRhID0gbmV3IFN1YmplY3Q8T2JqZWN0PigpO1xuICBwcml2YXRlIF9kYXRhU3RyZWFtJCA9IHRoaXMuX2RhdGEuYXNPYnNlcnZhYmxlKCk7XG5cbiAgcHJpdmF0ZSBfc3Vic2NyaXB0aW9uczogTWFwPHN0cmluZywgQXJyYXk8RnVuY3Rpb24+PiA9IG5ldyBNYXA8c3RyaW5nLCBBcnJheTxGdW5jdGlvbj4+KCk7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5fZGF0YVN0cmVhbSQuc3Vic2NyaWJlKChkYXRhKSA9PiB0aGlzLl9vbkV2ZW50KGRhdGEpKTtcbiAgfVxuXG4gIG5vdGlmeURhdGFDaGFuZ2VkKGV2ZW50LCB2YWx1ZSwgZm9yY2UgPSBmYWxzZSkge1xuICAgIGNvbnN0IGN1cnJlbnQgPSB0aGlzLl9kYXRhW2V2ZW50XTtcbiAgICBpZiAoY3VycmVudCAhPT0gdmFsdWUgfHwgZm9yY2UpIHtcbiAgICAgIHRoaXMuX2RhdGFbZXZlbnRdID0gdmFsdWU7XG5cbiAgICAgIHRoaXMuX2RhdGEubmV4dCh7XG4gICAgICAgIGV2ZW50OiBldmVudCxcbiAgICAgICAgZGF0YTogdGhpcy5fZGF0YVtldmVudF0sXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBzdWJzY3JpYmUoZXZlbnQ6IHN0cmluZywgY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XG4gICAgY29uc3Qgc3Vic2NyaWJlcnMgPSB0aGlzLl9zdWJzY3JpcHRpb25zLmdldChldmVudCkgfHwgW107XG4gICAgc3Vic2NyaWJlcnMucHVzaChjYWxsYmFjayk7XG5cbiAgICB0aGlzLl9zdWJzY3JpcHRpb25zLnNldChldmVudCwgc3Vic2NyaWJlcnMpO1xuICB9XG5cbiAgX29uRXZlbnQoZGF0YTogYW55KSB7XG4gICAgY29uc3Qgc3Vic2NyaWJlcnMgPSB0aGlzLl9zdWJzY3JpcHRpb25zLmdldChkYXRhWydldmVudCddKSB8fCBbXTtcblxuICAgIHN1YnNjcmliZXJzLmZvckVhY2goKGNhbGxiYWNrKSA9PiB7XG4gICAgICBjYWxsYmFjay5jYWxsKG51bGwsIGRhdGFbJ2RhdGEnXSk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==