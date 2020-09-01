import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import * as i0 from "@angular/core";
export class GlobalState {
    constructor() {
        this.data = new Subject();
        this.dataStream$ = this.data.asObservable();
        this.subscriptions = new Map();
        this.dataStream$.subscribe((data) => this.onEvent(data));
    }
    publish(event, value, force = false) {
        const current = this.data[event];
        if (current !== value || force) {
            this.data[event] = value;
            this.data.next({
                event: event,
                data: this.data[event],
            });
        }
    }
    subscribe(event, callback) {
        const subscribers = this.subscriptions.get(event) || [];
        if (subscribers.indexOf(callback) < 0) {
            subscribers.push(callback);
        }
        this.subscriptions.set(event, subscribers);
    }
    onEvent(data) {
        const subscribers = this.subscriptions.get(data['event']) || [];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xvYmFsLnN0YXRlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWNvcmVhcGktcHJveHkvIiwic291cmNlcyI6WyJsaWIvZ2xvYmFsLnN0YXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGNBQWMsQ0FBQzs7QUFHdkMsTUFBTSxPQUFPLFdBQVc7SUFPdEI7UUFMUSxTQUFJLEdBQUcsSUFBSSxPQUFPLEVBQVUsQ0FBQztRQUM3QixnQkFBVyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFFdkMsa0JBQWEsR0FBaUMsSUFBSSxHQUFHLEVBQTJCLENBQUM7UUFHdkYsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBRUQsT0FBTyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxHQUFHLEtBQUs7UUFDakMsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNqQyxJQUFJLE9BQU8sS0FBSyxLQUFLLElBQUksS0FBSyxFQUFFO1lBQzlCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FBSyxDQUFDO1lBRXpCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUNiLEtBQUssRUFBRSxLQUFLO2dCQUNaLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQzthQUN2QixDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7SUFFRCxTQUFTLENBQUMsS0FBYSxFQUFFLFFBQWtCO1FBQ3pDLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN4RCxJQUFJLFdBQVcsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ3JDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDNUI7UUFDRCxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVELE9BQU8sQ0FBQyxJQUFTO1FBQ2YsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2hFLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtZQUMvQixRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUNwQyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7O3NFQXBDVSxXQUFXO21EQUFYLFdBQVcsV0FBWCxXQUFXO2tEQUFYLFdBQVc7Y0FEdkIsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzL1N1YmplY3QnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgR2xvYmFsU3RhdGUge1xuXG4gIHByaXZhdGUgZGF0YSA9IG5ldyBTdWJqZWN0PE9iamVjdD4oKTtcbiAgcHJpdmF0ZSBkYXRhU3RyZWFtJCA9IHRoaXMuZGF0YS5hc09ic2VydmFibGUoKTtcblxuICBwcml2YXRlIHN1YnNjcmlwdGlvbnM6IE1hcDxzdHJpbmcsIEFycmF5PEZ1bmN0aW9uPj4gPSBuZXcgTWFwPHN0cmluZywgQXJyYXk8RnVuY3Rpb24+PigpO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuZGF0YVN0cmVhbSQuc3Vic2NyaWJlKChkYXRhKSA9PiB0aGlzLm9uRXZlbnQoZGF0YSkpO1xuICB9XG5cbiAgcHVibGlzaChldmVudCwgdmFsdWUsIGZvcmNlID0gZmFsc2UpIHtcbiAgICBjb25zdCBjdXJyZW50ID0gdGhpcy5kYXRhW2V2ZW50XTtcbiAgICBpZiAoY3VycmVudCAhPT0gdmFsdWUgfHwgZm9yY2UpIHtcbiAgICAgIHRoaXMuZGF0YVtldmVudF0gPSB2YWx1ZTtcblxuICAgICAgdGhpcy5kYXRhLm5leHQoe1xuICAgICAgICBldmVudDogZXZlbnQsXG4gICAgICAgIGRhdGE6IHRoaXMuZGF0YVtldmVudF0sXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBzdWJzY3JpYmUoZXZlbnQ6IHN0cmluZywgY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XG4gICAgY29uc3Qgc3Vic2NyaWJlcnMgPSB0aGlzLnN1YnNjcmlwdGlvbnMuZ2V0KGV2ZW50KSB8fCBbXTtcbiAgICBpZiAoc3Vic2NyaWJlcnMuaW5kZXhPZihjYWxsYmFjaykgPCAwKSB7XG4gICAgICBzdWJzY3JpYmVycy5wdXNoKGNhbGxiYWNrKTtcbiAgICB9XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnNldChldmVudCwgc3Vic2NyaWJlcnMpO1xuICB9XG5cbiAgb25FdmVudChkYXRhOiBhbnkpIHtcbiAgICBjb25zdCBzdWJzY3JpYmVycyA9IHRoaXMuc3Vic2NyaXB0aW9ucy5nZXQoZGF0YVsnZXZlbnQnXSkgfHwgW107XG4gICAgc3Vic2NyaWJlcnMuZm9yRWFjaCgoY2FsbGJhY2spID0+IHtcbiAgICAgIGNhbGxiYWNrLmNhbGwobnVsbCwgZGF0YVsnZGF0YSddKTtcbiAgICB9KTtcbiAgfVxufVxuIl19