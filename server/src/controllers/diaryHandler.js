const Diary = require('../models/diarySchema')

exports.create = async (req, res) => {
    console.log(req)
    try {
        const DiarysCount = await Diary.find().count()
        const diary = await Diary.create({
            user: req.user._id,
            position: DiarysCount > 0 ? DiarysCount : 0
        })
        res.status(201).json(diary)
    } catch (error) {
        console.log('创建日记失败')
        res.status(500).json(error)
    }
}

exports.getAll = async (req, res) => {
    try {
        const Diarys = await Diary.find({ find: req.user._id }).sort('-position')
        res.status(200).json(Diarys)
    } catch (error) {
        console.log('展示所有日记失败')
        res.status(500).json(error)
    }
}


exports.getOne = async (req, res) => {
    console.log('进入getOne')
    const { diaryId } = req.params
    try {
        const diary = await Diary.findOne({ user: req.user._id, _id: diaryId })
        if (!diary) {
            return res.status(404).json('Diary not found.')
        }
        res.status(200).json(diary)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}


exports.update = async (req, res) => {
    const { diaryId } = req.params
    const { title, description, favorites,content} = req.body

    try {
        if (title === '') req.body.title = 'Untitled'

        if (description === '')  req.body.description = 'Add description here'
        
     

        const currentDiary = await Diary.findById(diaryId)

        if (!currentDiary) {
            return res.status(404).json('Diary not found')
        }
        
// 检查 'favorites' 字段是否定义且已更改
        if (favorites !== undefined && currentDiary.favorites !== favorites) {
             // 查找同一用户下除了当前日记以外的所有其他收藏
            const allfavorites = await Diary.find({
                user: currentDiary.user,
                favorites: true,
                _id: { $ne: diaryId }
            }).sort('favoritesPosition')
// 如果存在其他收藏，则将当前日记的 'favoritesPosition' 设置为收藏总数
            if (allfavorites) {
                req.body.favoritesPosition = allfavorites.length > 0 ? allfavorites.length : 0
            } else {

                for (const key in allfavorites) {
                    const element = allfavorites[key]
                    await Diary.findByIdAndUpdate(
                        element.id,
                        {$set:{favoritesPosition:key}}
                    )
                }
            }
        }

        const diary = await Diary.findByIdAndUpdate(
            diaryId,
            {$set:req.body}
        )
        res.status(200).json(diary)
    } catch (error) {
        console.log('无法更新当前日记')
        res.status(500).json(error)
    }

}


exports.getfavorites =async(req,res)=>{
    try{
        const allfavorites = await Diary.find({
            user:req.user._id,
            favorites:true
        }).sort('-favoritesPosition')
        res.status(200).json(allfavorites)
    }catch(error){
        console.log('无法获取收藏日记')
        res.status(500).json(error)
    }
}


exports.delete =async(req,res)=>{
    const {diaryId} = req.params
    try{

        const currentDiary =await Diary.findById(diaryId)
//取出除了当前diaryid之外的该用户其他收藏diary
        if(currentDiary.favorites){
            const allfavorites = await Diary.find({
                user: currentDiary.user,
                favorites: true,
                _id: { $ne: diaryId }
            }).sort('favoritesPosition')
//给取消收藏之外的favorites重新排位置
            for (const key in allfavorites) {
                const element = allfavorites[key]
                await Diary.findByIdAndUpdate(
                    element.id,
                    {$set:{favoritesPosition:key}}
                )
            }
        }
//删除当前日记并给剩下的重新排位置
        await Diary.deleteOne({_id:diaryId})
        const Diarys = await Diary.find().sort('position')
        for (const key in Diarys) {
            const diary = Diarys[key]
            await Diary.findByIdAndUpdate(
                diary.id,
                { $set: { position: key } }
            )
        }
        res.status(200).json('deleted')
    }catch(error){
        console.log('无法删除当前日记')
        res.status(500).json(error)
    }

}