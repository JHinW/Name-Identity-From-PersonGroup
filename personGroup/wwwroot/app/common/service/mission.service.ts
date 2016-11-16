import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class MissionService {
    // Observable number sources
    private missionImageSelect = new Subject<number>();

    // Observable number streams
    missionImageSelect$ = this.missionImageSelect.asObservable();

    // Service message commands
    emitMission(mission: number) {
        this.missionImageSelect.next(mission);
    }


}
