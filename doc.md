+ setup node js
    + package.json ( npm init )
        + node index.js
        + "type" : model : es6 mặc định là es5
    + thêm lib :
        + express : lưu khi thay đổi
        + cors : quản lý data
        + nodemon : lưu lại code như save auto
        -> npm i --save-dev express dotenv cors nodemon
    + .env 
        + file môi trường

2 : chia file index của bài 1 thành 
    + controller 
    + routes
    + service

3 : 
    + cài xampp
    + install sequelize 
    + install mysql2
        + tạo connection_database.js rồi copy doc
            + npm i sequelize-cli 
            + cd rsc > npx sequelize-cli init
            + config config.json 
                + database  : ".."
                + logging : false
                + timezone : "+07:00"
            + tạo bảng 
                + modals > user
                    --khóa chính :
                        + name : 
                        + email :
                        + password :
                        + avatar :
                        + role_code : 
                    -- khóa phụ ( copy từ bên user -> tạo file role )
                        + đổi user -> role
                        + trường :
                            + code :
                            + value :
                + migrations :
                    + chỉnh lại các trường
                    + thêm trường role_code
                    + thêm trường khóa phụ 
                        + đối users -> roles
                        + như trên xóa trường cũ trường mới là :
                            + code :
                            + value : 
            + đưa code lên tạo bảng
                + cd > src npx squelize db:migrate

4 : 
    + chỉnh lại createAt ( tgian thuc )
        
    + cài npm babel ( dùng thoải mái es5 or es6 )
        + tạo .babelrc
            + config .bable
            + dev : nodemon --exec babel-node 
    <!-- + truy vấn trong sql ( demo ) -->
        + INSERT INTO Roles (code , value ) VALUES ("R1" , "Admin1" )
        + INSERT INTO Roles (code , value ) VALUES ("R2" , "Admin2" )
        + INSERT INTO Roles (code , value ) VALUES ("R3" , "Admin3" )
        <!-- truy vẫns bằng code  -->
    + trong services
        + auth.js  
            + import db : modal
            + export : const register = () => new Promise( ( resolve ,reject )  => {
                try{...resolve } catch(err){...}
            })
    + trong controllers
        + auth.js
            + import * as services from " ../services "
            + export const register = async (req , res) => {
                try {
                    res.status(200).json()
                } catch (error) {

                }
            }
    =>    routers > controller > service