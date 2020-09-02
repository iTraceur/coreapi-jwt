import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
var GlobalState = /** @class */ (function () {
    function GlobalState() {
        var _this = this;
        this.data = new Subject();
        this.dataStream$ = this.data.asObservable();
        this.subscriptions = new Map();
        this.dataStream$.subscribe(function (data) { return _this.onEvent(data); });
    }
    GlobalState.prototype.publish = function (event, value, force) {
        if (force === void 0) { force = false; }
        var current = this.data[event];
        if (current !== value || force) {
            this.data[event] = value;
            this.data.next({
                event: event,
                data: this.data[event],
            });
        }
    };
    GlobalState.prototype.subscribe = function (event, callback) {
        var subscribers = this.subscriptions.get(event) || [];
        if (subscribers.indexOf(callback) < 0) {
            subscribers.push(callback);
        }
        this.subscriptions.set(event, subscribers);
    };
    GlobalState.prototype.onEvent = function (data) {
        var subscribers = this.subscriptions.get(data['event']) || [];
        subscribers.forEach(function (callback) {
            callback.call(null, data['data']);
        });
    };
    GlobalState = __decorate([
        Injectable()
    ], GlobalState);
    return GlobalState;
}());
export { GlobalState };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xvYmFsLnN0YXRlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWNvcmVhcGktcHJveHkvIiwic291cmNlcyI6WyJsaWIvZ2xvYmFsLnN0YXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFHdkM7SUFPRTtRQUFBLGlCQUVDO1FBUE8sU0FBSSxHQUFHLElBQUksT0FBTyxFQUFVLENBQUM7UUFDN0IsZ0JBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBRXZDLGtCQUFhLEdBQWlDLElBQUksR0FBRyxFQUEyQixDQUFDO1FBR3ZGLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLFVBQUMsSUFBSSxJQUFLLE9BQUEsS0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBbEIsQ0FBa0IsQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFFRCw2QkFBTyxHQUFQLFVBQVEsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFhO1FBQWIsc0JBQUEsRUFBQSxhQUFhO1FBQ2pDLElBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDakMsSUFBSSxPQUFPLEtBQUssS0FBSyxJQUFJLEtBQUssRUFBRTtZQUM5QixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQztZQUV6QixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztnQkFDYixLQUFLLEVBQUUsS0FBSztnQkFDWixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7YUFDdkIsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDO0lBRUQsK0JBQVMsR0FBVCxVQUFVLEtBQWEsRUFBRSxRQUFrQjtRQUN6QyxJQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDeEQsSUFBSSxXQUFXLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNyQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQzVCO1FBQ0QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFRCw2QkFBTyxHQUFQLFVBQVEsSUFBUztRQUNmLElBQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNoRSxXQUFXLENBQUMsT0FBTyxDQUFDLFVBQUMsUUFBUTtZQUMzQixRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUNwQyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFwQ1UsV0FBVztRQUR2QixVQUFVLEVBQUU7T0FDQSxXQUFXLENBcUN2QjtJQUFELGtCQUFDO0NBQUEsQUFyQ0QsSUFxQ0M7U0FyQ1ksV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzL1N1YmplY3QnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgR2xvYmFsU3RhdGUge1xuXG4gIHByaXZhdGUgZGF0YSA9IG5ldyBTdWJqZWN0PE9iamVjdD4oKTtcbiAgcHJpdmF0ZSBkYXRhU3RyZWFtJCA9IHRoaXMuZGF0YS5hc09ic2VydmFibGUoKTtcblxuICBwcml2YXRlIHN1YnNjcmlwdGlvbnM6IE1hcDxzdHJpbmcsIEFycmF5PEZ1bmN0aW9uPj4gPSBuZXcgTWFwPHN0cmluZywgQXJyYXk8RnVuY3Rpb24+PigpO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuZGF0YVN0cmVhbSQuc3Vic2NyaWJlKChkYXRhKSA9PiB0aGlzLm9uRXZlbnQoZGF0YSkpO1xuICB9XG5cbiAgcHVibGlzaChldmVudCwgdmFsdWUsIGZvcmNlID0gZmFsc2UpIHtcbiAgICBjb25zdCBjdXJyZW50ID0gdGhpcy5kYXRhW2V2ZW50XTtcbiAgICBpZiAoY3VycmVudCAhPT0gdmFsdWUgfHwgZm9yY2UpIHtcbiAgICAgIHRoaXMuZGF0YVtldmVudF0gPSB2YWx1ZTtcblxuICAgICAgdGhpcy5kYXRhLm5leHQoe1xuICAgICAgICBldmVudDogZXZlbnQsXG4gICAgICAgIGRhdGE6IHRoaXMuZGF0YVtldmVudF0sXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBzdWJzY3JpYmUoZXZlbnQ6IHN0cmluZywgY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XG4gICAgY29uc3Qgc3Vic2NyaWJlcnMgPSB0aGlzLnN1YnNjcmlwdGlvbnMuZ2V0KGV2ZW50KSB8fCBbXTtcbiAgICBpZiAoc3Vic2NyaWJlcnMuaW5kZXhPZihjYWxsYmFjaykgPCAwKSB7XG4gICAgICBzdWJzY3JpYmVycy5wdXNoKGNhbGxiYWNrKTtcbiAgICB9XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnNldChldmVudCwgc3Vic2NyaWJlcnMpO1xuICB9XG5cbiAgb25FdmVudChkYXRhOiBhbnkpIHtcbiAgICBjb25zdCBzdWJzY3JpYmVycyA9IHRoaXMuc3Vic2NyaXB0aW9ucy5nZXQoZGF0YVsnZXZlbnQnXSkgfHwgW107XG4gICAgc3Vic2NyaWJlcnMuZm9yRWFjaCgoY2FsbGJhY2spID0+IHtcbiAgICAgIGNhbGxiYWNrLmNhbGwobnVsbCwgZGF0YVsnZGF0YSddKTtcbiAgICB9KTtcbiAgfVxufVxuIl19