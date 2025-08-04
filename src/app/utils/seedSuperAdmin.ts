import { IUser, Role } from "../modules/user/user.interface"
import { User } from "../modules/user/user.model"
import bcryptjs from "bcryptjs"



export const seedSuperAdmin = async() => {
    
    try {
        const isSuperAdminExist = await User.findOne({phone: process.env.SUPER_ADMIN_PHONE})

        if(isSuperAdminExist){
            console.log("Super Admin Already Exist")
            return
        }

        const hashedPassword = await bcryptjs.hash(process.env.SUPER_ADMIN_PIN as string, Number(process.env.BCRYPT_SALT_ROUND))

        const payload: Partial<IUser> = {
            name: "Super Admin",
            phone: process.env.SUPER_ADMIN_PHONE as string,
            pin: hashedPassword,
            role: Role.SUPERADMIN,
            isBlocked: false
        }

        const superAdmin = await User.create(payload)

        return superAdmin
    } catch (error) {
        console.log(error)
    }
}