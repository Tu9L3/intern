// import { SetMetadata } from '@nestjs/common';
// import { Position } from 'src/enum';

// export const POS_KEY = 'position';
// export const Positions = (...positions: Position[]) => SetMetadata(POS_KEY, positions);


import { Reflector } from '@nestjs/core';

export const Positions = Reflector.createDecorator<string[]>();