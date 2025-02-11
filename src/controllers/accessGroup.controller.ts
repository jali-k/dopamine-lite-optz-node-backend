import { Request, Response } from 'express';
import { AccessGroup } from '../models/AccessGroup';
import { catchAsync } from '../utils/catchAsync';
import { ApiError } from '../middleware/error.midleware';
import { Op } from 'sequelize';
import { CreateAccessGroupDTO, UpdateAccessGroupDTO } from '../types/accessGroup.types';
import { Sequelize } from 'sequelize-typescript';

export const accessGroupController = {
  getAllAccessGroups: catchAsync(async (req: Request, res: Response) => {
    const accessGroups = await AccessGroup.findAll();
    res.json({ success: true, data: accessGroups });
  }),

  getAccessGroupById: catchAsync(async (req: Request, res: Response) => {
    const accessGroupId = req.params.accessGroupId
    const accessGroup = await AccessGroup.findByPk(accessGroupId);
    if (!accessGroup) {
      throw new ApiError(404, 'Access Group not found');
    }
    res.json({ success: true, data: accessGroup });
  }),

  getAccessGroupsByEmail: catchAsync(async (req: Request, res: Response) => {
    const email = req.query.email;
    const accessGroups = await AccessGroup.findAll({
      where: {
        accessList: {
          [Op.contains]: Sequelize.literal(`ARRAY['${email}']::text[]`),
        },
      },
    });

    if (!accessGroups || accessGroups.length === 0) {
      res.json({ success: true, data: null });
    }

    const accessGroupIds = accessGroups.map(group => group.accessGroupId);
    res.json({ success: true, data: accessGroupIds });
  }),

  createAccessGroup: catchAsync(async (req: Request<{}, {}, CreateAccessGroupDTO>, res: Response) => {
    const { accessGroupId, ...rest } = req.body;
    if (!accessGroupId) {
      throw new ApiError(400, 'accessGroupId is required');
    }
    const newAccessGroup = await AccessGroup.create(req.body);
    res.status(201).json({ success: true, data: newAccessGroup });
  }),

  updateAccessGroup: catchAsync(
    async (req: Request< UpdateAccessGroupDTO>, res: Response) => {
      const { accessGroupId, ...rest } = req.body;
      if (!accessGroupId) {
        throw new ApiError(400, 'accessGroupId is required');
      }
      const [updatedRows] = await AccessGroup.update(req.body, {
        where: { accessGroupId: req.params.accessGroupId },
      });

      if (updatedRows === 0) {
        throw new ApiError(404, 'Access Group not found');
      }

      res.json({ success: true, message: 'Access Group updated successfully' });
    }
  ),

  deleteAccessGroup: catchAsync(async (req: Request, res: Response) => {
    const accessGroupId = req.params.accessGroupId;
    const deleted = await AccessGroup.destroy({
      where: { accessGroupId: accessGroupId },
    });

    if (!deleted) {
      throw new ApiError(404, 'Access Group not found');
    }

    res.json({ success: true, message: 'Access Group deleted successfully' });
  }),
};