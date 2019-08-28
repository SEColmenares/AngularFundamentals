import { TestBed } from '@angular/core/testing';

import { GitSearchUsersService } from './git-search-users.service';

describe('GitSearchUsersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GitSearchUsersService = TestBed.get(GitSearchUsersService);
    expect(service).toBeTruthy();
  });
});
