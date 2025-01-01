import { Request, Response } from 'express';
import { AccessGroup } from '../models/AccessGroup';
import { catchAsync } from '../utils/catchAsync';
import { ApiError } from '../middleware/error.midleware';
import { CreateAccessGroupDTO, UpdateAccessGroupDTO } from '../types/accessGroup.types';

export const accessGroupController = {
  getAllAccessGroups: catchAsync(async (req: Request, res: Response) => {
    const accessGroups = await AccessGroup.findAll();
    res.json({ success: true, data: accessGroups });
  }),

  getAccessGroupById: catchAsync(async (req: Request, res: Response) => {
    const accessGroup = await AccessGroup.findByPk(req.params.id);
    if (!accessGroup) {
      throw new ApiError(404, 'Access Group not found');
    }
    res.json({ success: true, data: accessGroup });
  }),

  createAccessGroup: catchAsync(async (req: Request<{}, {}, CreateAccessGroupDTO>, res: Response) => {
    const newAccessGroup = await AccessGroup.create(req.body);
    res.status(201).json({ success: true, data: newAccessGroup });
  }),

  updateAccessGroup: catchAsync(
    async (req: Request< UpdateAccessGroupDTO>, res: Response) => {
      const [updatedRows] = await AccessGroup.update(req.body, {
        where: { accessGroupID: req.params.accessGroupID },
      });

      if (updatedRows === 0) {
        throw new ApiError(404, 'Access Group not found');
      }

      res.json({ success: true, message: 'Access Group updated successfully' });
    }
  ),

  deleteAccessGroup: catchAsync(async (req: Request, res: Response) => {
    const deleted = await AccessGroup.destroy({
      where: { accessGroupID: req.params.id },
    });

    if (!deleted) {
      throw new ApiError(404, 'Access Group not found');
    }

    res.json({ success: true, message: 'Access Group deleted successfully' });
  }),
};