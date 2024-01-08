import { ReleaseUpdateDtoV } from '@modules/project/dtov/release-update.dtov';
import { Release } from '@modules/project/entities/release.entity';
import { Injectable } from '@nestjs/common';
import { CrudService } from '@shared/classes/crud-service.class';

@Injectable()
export class ReleaseService extends CrudService<
  Release,
  Partial<Release>,
  ReleaseUpdateDtoV
> {
  target: typeof Release = Release;
}
