import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xvYmFsLnN0YXRlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWNvcmVhcGktcHJveHkvIiwic291cmNlcyI6WyJsaWIvZ2xvYmFsLnN0YXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFHL0I7SUFPRTtRQUFBLGlCQUVDO1FBUE8sU0FBSSxHQUFHLElBQUksT0FBTyxFQUFVLENBQUM7UUFDN0IsZ0JBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBRXZDLGtCQUFhLEdBQWlDLElBQUksR0FBRyxFQUEyQixDQUFDO1FBR3ZGLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLFVBQUMsSUFBSSxJQUFLLE9BQUEsS0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBbEIsQ0FBa0IsQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFFRCw2QkFBTyxHQUFQLFVBQVEsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFhO1FBQWIsc0JBQUEsRUFBQSxhQUFhO1FBQ2pDLElBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDakMsSUFBSSxPQUFPLEtBQUssS0FBSyxJQUFJLEtBQUssRUFBRTtZQUM5QixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQztZQUV6QixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztnQkFDYixLQUFLLEVBQUUsS0FBSztnQkFDWixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7YUFDdkIsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDO0lBRUQsK0JBQVMsR0FBVCxVQUFVLEtBQWEsRUFBRSxRQUFrQjtRQUN6QyxJQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDeEQsSUFBSSxXQUFXLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNyQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQzVCO1FBQ0QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFRCw2QkFBTyxHQUFQLFVBQVEsSUFBUztRQUNmLElBQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNoRSxXQUFXLENBQUMsT0FBTyxDQUFDLFVBQUMsUUFBUTtZQUMzQixRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUNwQyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFwQ1UsV0FBVztRQUR2QixVQUFVLEVBQUU7T0FDQSxXQUFXLENBcUN2QjtJQUFELGtCQUFDO0NBQUEsQUFyQ0QsSUFxQ0M7U0FyQ1ksV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEdsb2JhbFN0YXRlIHtcblxuICBwcml2YXRlIGRhdGEgPSBuZXcgU3ViamVjdDxPYmplY3Q+KCk7XG4gIHByaXZhdGUgZGF0YVN0cmVhbSQgPSB0aGlzLmRhdGEuYXNPYnNlcnZhYmxlKCk7XG5cbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zOiBNYXA8c3RyaW5nLCBBcnJheTxGdW5jdGlvbj4+ID0gbmV3IE1hcDxzdHJpbmcsIEFycmF5PEZ1bmN0aW9uPj4oKTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmRhdGFTdHJlYW0kLnN1YnNjcmliZSgoZGF0YSkgPT4gdGhpcy5vbkV2ZW50KGRhdGEpKTtcbiAgfVxuXG4gIHB1Ymxpc2goZXZlbnQsIHZhbHVlLCBmb3JjZSA9IGZhbHNlKSB7XG4gICAgY29uc3QgY3VycmVudCA9IHRoaXMuZGF0YVtldmVudF07XG4gICAgaWYgKGN1cnJlbnQgIT09IHZhbHVlIHx8IGZvcmNlKSB7XG4gICAgICB0aGlzLmRhdGFbZXZlbnRdID0gdmFsdWU7XG5cbiAgICAgIHRoaXMuZGF0YS5uZXh0KHtcbiAgICAgICAgZXZlbnQ6IGV2ZW50LFxuICAgICAgICBkYXRhOiB0aGlzLmRhdGFbZXZlbnRdLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgc3Vic2NyaWJlKGV2ZW50OiBzdHJpbmcsIGNhbGxiYWNrOiBGdW5jdGlvbikge1xuICAgIGNvbnN0IHN1YnNjcmliZXJzID0gdGhpcy5zdWJzY3JpcHRpb25zLmdldChldmVudCkgfHwgW107XG4gICAgaWYgKHN1YnNjcmliZXJzLmluZGV4T2YoY2FsbGJhY2spIDwgMCkge1xuICAgICAgc3Vic2NyaWJlcnMucHVzaChjYWxsYmFjayk7XG4gICAgfVxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5zZXQoZXZlbnQsIHN1YnNjcmliZXJzKTtcbiAgfVxuXG4gIG9uRXZlbnQoZGF0YTogYW55KSB7XG4gICAgY29uc3Qgc3Vic2NyaWJlcnMgPSB0aGlzLnN1YnNjcmlwdGlvbnMuZ2V0KGRhdGFbJ2V2ZW50J10pIHx8IFtdO1xuICAgIHN1YnNjcmliZXJzLmZvckVhY2goKGNhbGxiYWNrKSA9PiB7XG4gICAgICBjYWxsYmFjay5jYWxsKG51bGwsIGRhdGFbJ2RhdGEnXSk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==