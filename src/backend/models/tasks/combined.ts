import { UpdateArtworkDto } from '../artwork/update';
import { UpdateDistributionDto } from '../distribution/update';
import { UpdateMasteringDto } from '../mastering/update';

import { UpdateBaseReleaseTaskDto } from './update';

export type UpdateReleaseTaskDto = UpdateBaseReleaseTaskDto &
  UpdateArtworkDto &
  UpdateDistributionDto &
  UpdateMasteringDto;
