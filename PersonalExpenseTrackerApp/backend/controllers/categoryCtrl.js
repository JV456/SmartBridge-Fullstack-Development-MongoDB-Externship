const asyncHandler = require('express-async-handler');
const Category = require("../model/Category");
const Transaction = require('../model/Transaction');

const categoryController = {
    //!add
    create: asyncHandler( async (req, res)=>{
        const {name, type} = req.body;
        if(!name || !type){
            throw new Error('Name and Type are required for creating a category')
        }
        //convert the name to lowercase
        const normalizedName = name.toLowerCase();
        //! check if the type is valid
        const validType = ['income', 'expense'];
        if(!validType.includes(type.toLowerCase())){
            throw new Error('Invalid category type' + type);
        }
        //! Check if category already exixts on the user
        const categoryExists = await Category.findOne({ 
            name: normalizedName, 
            user: req.user, 
        });
        if(categoryExists){
            throw new Error(
                `Category ${categoryExists.name} already exists in the database`
            );
        }
        //! Create the category
        const category = await Category.create({
            name: normalizedName,
            user: req.user,
            type,
        });
        res.status(201).json(category);
    }),

    //!lists
    lists: asyncHandler( async (req, res)=> {
        const categories = await Category.find({ user: req.user });
        res.status(200).json(categories);
    }),

    //!update
    update: asyncHandler(async(req, res)=> {
        const { categoryId } = req.params;
        const { type, name } = req.body;
        const normalizedName = name.toLowerCase();
        const category = await Category.findById(categoryId);
        if(!category && category.user.toString() !== req.user.toString()) {
            throw new Error("Category not found or user not authorized");
        }
        const oldName = category.name;
        //!Update category properties
        category.name = normalizedName || category.name;
        category.type = type || category.type;
        const updatedCategory = await category.save()
        //Updated affected transaction
        if(oldName !== updatedCategory.name){
            await Transaction.updateMany(
                {
                    user: req.user,
                    category: oldName,
                },
                { $set: { category: updatedCategory.name } }
            );
        }
        res.json(updatedCategory);
    }),

    //!delete
    delete: asyncHandler(async(req, res)=> {
        const category = await Category.findById(req.params.id);
        if(category && category.user.toString() === req.user.toString()){
            //!Update transaction that have this category
            const defaultCategory = 'Uncategorized';
            await Transaction.updateMany(
                {user: req.user, category: category.name},
                { $set: { category: defaultCategory } }
            );
            //!Remove the category
            await Category.findByIdAndDelete(req.params.id);
            res.json({message: "Category removed and transactions updated" });
        }else{
            res.json({message: "Category not found or user not authorized" });
        }
    }),
};

module.exports = categoryController;