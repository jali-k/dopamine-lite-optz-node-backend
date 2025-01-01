// import { Request, Response } from 'express';
// import { VideoProgress } from '../models/VideoProgress';
// import { Lecture } from '../models/Lecture';
// import { catchAsync } from '../utils/catchAsync';
// import { ApiError } from '../middleware/error.middleware';
// import { CreateVideoProgressDTO, UpdateVideoProgressDTO } from '../types/videoProgress.types';

// export const videoProgressController = {
//   getUserProgress: catchAsync(async (req: Request, res: Response) => {
//     const progress = await VideoProgress.findAll({
//       where: { userID: req.params.userId },
//       include: [{
//         model: Lecture,
//         attributes: ['title', 'duration']
//       }]
//     });

//     res.json({ success: true, data: progress });
//   }),

//   getProgressByLecture: catchAsync(async (req: Request, res: Response) => {
//     const progress = await VideoProgress.findOne({
//       where: {
//         userID: req.params.userId,
//         lectureID: req.params.lectureId
//       }
//     });

//     if (!progress) {
//       throw new ApiError(404, 'Progress not found');
//     }

//     res.json({ success: true, data: progress });
//   }),

//   updateProgress: catchAsync(async (req: Request<{ userId: string, lectureId: string }, {}, UpdateVideoProgressDTO>, res: Response) => {
//     const [progress] = await VideoProgress.upsert({
//       userID: parseInt(req.params.userId),
//       lectureID: parseInt(req.params.lectureId),
//       ...req.body,
//       lastWatchedAt: new Date()
//     });

//     res.json({ success: true, data: progress });
//   }),

//   markAsCompleted: catchAsync(async (req: Request, res: Response) => {
//     const progress = await VideoProgress.findOne({
//       where: {
//         userID: req.params.userId,
//         lectureID: req.params.lectureId
//       }
//     });

//     if (!progress) {
//       throw new ApiError(404, 'Progress not found');
//     }

//     progress.completed = true;
//     await progress.save();

//     res.json({ success: true, message: 'Lecture marked as completed' });
//   }),

//   getProgressStats: catchAsync(async (req: Request, res: Response) => {
//     const progress = await VideoProgress.findAll({
//       where: { userID: req.params.userId }
//     });

//     const stats = {
//       totalLectures: progress.length,
//       completedLectures: progress.filter(p => p.completed).length,
//       totalWatchTime: progress.reduce((sum, p) => sum + p.watchedSeconds, 0),
//       averageProgress: progress.reduce((sum, p) => sum + p.getProgressPercentage(), 0) / progress.length
//     };

//     res.json({ success: true, data: stats });
//   })
// };