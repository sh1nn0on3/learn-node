1.
    + setup node js
    + package.json ( npm init )
        + node index.js
        + "type" : model : es6 mặc định là es5
    + thêm lib :
        + express : lưu khi thay đổi
        + cors : bảo mật trình duyệt web
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


5 :
    + check db ( email, password )
    + service 
        + register = ({ email, password })
            + try {...}
                + const response = await db.User.findOrCreate(...)
                        -> User : tên bảng định tạo
                        -> findOrCreate : của lib squelize << tìm hiểu ở GG >>
                            -> hiểu đơn giản như useState nhưng cái setState dạng boolean
                    + ...
                        + where : email << kiểm tra xem email đã có chưa ? >>
                        + defaults : {
                            email,
                            password << cận thận dùng thêm mã hóa - nhưng lười t k dùng >>
                        }  << để tạo nhiều cột >>
                + resolve ({ ... })
                    + err : response[1] ? 0 : 1 ,
                        -> response[1] : là boolean của thg trên để xem đã có email chưa ? 
                        -> 0 : false  || 1 : true 
                        < để khi in ra biết nó true hay false chứ cũng chả logic gì >
                    + mess : response[1] ? " Response is successfull " : " false "
                        -> toán tử 3 ngôi như bth đọc tự hiểu !!
    + controller > auth.js
        + const { email , password } = req.body << lấy data gửi lên >>
        + if( !email || !password ) return res.status(400).json({
            err : 1 ;
            mes : " Missing payloads "
        })
            -> để tối ưu hiệu suất của api nếu k có thì return ra ngoài
    + test qua api.http
    + migrations > user 
        + role_code :
            + defaultValue : "R3"
            -> xóa user trên local để reload lại 

6 
    + coding API Login 
    + jsonwebtoken 
        -> cài bằng npm 
    + trong env 
        -> JWT_SECRET = ...
        -> ghi cgi cũng được 
    + service > auth
        + import jwt from "jsonwebtoken"
            -> đọc doc 
            -> có 2 hàm chính sign -- verify
                -> sign ( payload , secret , [opt , callback] )
                -> verify (token , secret , [opt, callback])
        + const token = response[1] ? jwt.sign({...} , ... , {...}) : null
            -> check thử response trả về true hay false
                << có thể log ra nhìn để dễ hiểu hơn >>
            -> dùng hàm jwt.sign 
                -> id : response[0].id , email, role_code 
                    << gọi các biến id , email , role >>
                -> process.env.JWT_SECRET 
                    << đoạn mã hóa  >>
                -> expireIn : "5d"
                    << thời gian sống >>
        + resole 
            + token 
        + Gọi đăng ký từ gửi api.http 

        + auth -> login
                -> thêm login = copy auth đổi thành login 
            + db.User.findOne({...})
                + where : { email },
                + raw : true 
                    -> raw : true để lấy mỗi obj thuần 
                    <!-- -> login thì không cần token  -->
            + resolve 
                + đổi token -> response 
    + controllers > auth  
        + thêm thằng login bên dưới 
            -> xog sửa auth -> login 
    + routes
        + router.post(.. , ..)
            + đường dẫn "/"
            + controllers.login 
    + test 
        + api.http 
            -> 1 request 
    + bouns : hiện token khi gửi request
        + service > auth
            + const token = response ? ... : null
                -> response check xem tìm hàm đúng hay không
                -> jwt.sign({...})
                    -> hàm trả về id , email , role_code 
                        << như thằng auth bên trên  >>
            + resolve ({...})
                + thêm thằng 
                    -> "access_token" : token ? `Bearer ${token}` : token


7 .
    + Tạo handle xử lý và validate sever side 
        + tạo thư viện xử lý lỗi 
        + dùng packet để xử lý (check input)
    + xử lý err
        + dùng lib http-error && joi (install npm)
    
    + tạo 1 folder mới middlewares
            -> xác thực token 
        + tạo handle_errors.js 
                -> tạo hay không tạo cũng được ~~
            +  import createError from "http-errors"
            + tạo biển trả ra :V (12:25 hoặc đọc doc)
        + vào routers/index 
            + sửa thằng trả ra cuối đầu ra 
        + vào controller/auth
            + cũng đổi hiện lỗi vào handle_errors
    + dùng joi
            -> kiểm tra form đầu vào xem đúng chưa ?
            -> kiểm tra tk , mk đầu vào đã đúng kiểu đúng như ý muốn chưa 
        + tạo helpers / joi_schema.js
            + export email , password 
        + vào controller / auth 
            + chỉnh lại email , password theo ý 
            + joi.object({email, password}).validate(req.body)

8 .
        -> verify access token để check input 
    + services
        + tạo user.js 
                -> cop từ auth sang
            + tạo export const getOne = (userId)
                    -> sequelize -- dùng hàm findOne 
                + try{...}
                    + await db.user.findOne({...})
                        + where : {id : userId}
                                -> kiểm tra hàm truyền vào là id có userId nào trùng cần tìm hay k ?
                        + attributes : {
                            exclude: ["password"]
                        }
                    + sửa lại resolve 
        + xuất ra file index.js

    + controllers/user.js
        + tạo getCurrent
                -> user hiện tại 
            + const {id} = req.user 
                    -> lấy id trong req user được gửi lên 
            + response = await services.getOne(id)
                    -> dùng getOne để lấy id của req.user trên 


    + middlewares
        + handle_errors
            + tạo thêm notAuth như badRequest (Unauthorized)
        + tạo verify_token.js 
                -> tạo check lỗi 
            + import jwt from ...
            + const verifyToken = (req , res , next) =>{
                const token = req.header.authorization
                if(!token) return notAuth(`...`)
                const accessToken = token.split(" ")[1] 
                jwt.verify(accessToken , process.env.JWT_SECRET , (err , user) => {
                    if(err) return notAuth("Access token may be expired or invalid")
                    req.user = user
                    next()
                } )
            }
            + export default verifyToken

    + routes/user
        + điều hướng đổi thành getCurrent 
        + router.use(verifyToken)

9. 
    + get dataa

10. 
    <!-- models để tạo bảng -->
    + models > book.js
            --> tạo bảng là book  (cop role.js)
        + book.init({...})
            + title : DataTypes.(string)
            + price: (float)
            + available : (integer)
            + image : (string)
            + image : (string)
            + description : (text)
            + category_code: (string)  
                    --> khóa phụ
            
    + models > category.js 
            --> tạo bảng chứa các mục chứa sách (travel , historicalFiction)
        + value : {...}
            + set(value){...}
                + this.setDateValue("value" , value.charAy(0).toUpperCase() + value.slice(1))
                        --> để viết hoa chữ cái đầu tiên   
    <!-- migrations để đưa models lên db -->
    + migrations > create_books.js
            --> đưa books lên db (cop roles sang)
        + sửa createTable
            + id 
                + bỏ autoI 
                        --> bỏ tăng vì dùng urc là Id
                    + type : String
                + tạo bảng như đầu vào bên models
                + lưu ý :
                    + avaiable && price có thể không có giá trị 
                            --> thêm defaultValue : 0
    + migrations > create_category.js
            --> cũng như bên books
            --> lưu ý :
                    + viết hoa chữ đầu
                    + thêm "s" thành categories 
                    + còn lại như hàm bên models
                    
    <!-- npx sequelize db:migrate -->
    + check 
        + check thử xem đã có ở db (xampp chưa )



    <!-- db lên insert  -->
    + service > insert.js 
            --> chỉ log ra test thử xem chạy được không
        + import data "../../data/data.json"
        + try{...}catch{...}
            + log(...)
                + object.keys(data)
                        --> coi data là cái mảng và key chứa các mảng con 
            + resole("Ok")
            + reject(error)

        + export 

    <!-- điều khiển hàm db -->
    + controller > insert.js
            --> tạo hàm insert
        + const inserData = async(req, res) => {...}
            + try{...}catch(err){...}
                + getOne --> inserData
        + export

    <!--  Điều hướng db -->
    + routers > insert.js 
            --> tạo hàm insert 
        + tạo hàm 
            + router.get("\" , controllers.insertData)

    + index.js
        + import 
                --> gọi hàm
        + app.use("/api/v1/insert" , insert)
                --> định nghĩa routes
                
    <!--  test api.http -->
    + Get (link )
        + nó in ra OK (res ở services)
        + log ra mảng các key

    <!-- tạo hàm xử lý -->
    + helper > fn.js
            --> tạo đoạn code làm ID (28:22)
        + export const generateCode = (value) => {...}
            + let output = "" ;
            + value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(" ").forEach(item => {...})
                + output += item.charAt(1) + item.charAt(0)
                        --> normalize . replace : hàm vào chuyển thành không dấu
                        --> split : chia cắt các từ thành mảng (điều kiện ở trong)
                        --> forEach : như hàm for lặp qua các phần tử
                        --> đoạn output : kí tự thứ 2 + thứ 1 
            + return {...}
                + output.toUpperCase() + value.lenghth
                        --> hàm toUpperCase : dùng in hoa các ký tự
                        --> cộng với độ dài của mảng
                        --> Đoạn trên để làm không bị trùng rồi làm Id

    <!-- lọc các object key rồi tạo mảng code -->
    + services > insert.js
            --> làm lại hàm trả ra
        + const categories = Object.keys(data)
        + categories.forEach(async(item) => {...})
            + awai db.Category.create({...})
                + code : generateCode(item),
                        --> generateCode : lấy từ import (fn.js)
                + value : item

    <!-- tạo thêm bảng data -->
    + services > insert.js
            --> tạo hàm thêm data trực tiếp từ code lên 
        + const dataArr = object.entries(data)
                --> dataArr : biến hứng
                --> entries : biến chuyển data thành các chuỗi string con (47:44)
        + dataArr.forEach(item => {...})
            + item[1]?map(async(book) => {...})
                    --> item[1] : vì item[0] là value ban đầu
                + await db.Book.create({...})
                        --> các hàm từ trong models
                    + id : book.upc
                    + title : book.bookTitle
                    + ...
                    + category_code : generateCode(item[0])
                            --> giá trị ban đầu
                    + lưu ý : (thêm + trước các tt sau :)
                            --> để chuyển string sang number
                        + price 
                        + available
    + api.http 
        + kiểm tra    
                    
11. 
    + viết CRUD
            --> trình tự vẫn service > controller > routes 
    
    <!-- hàm READ -->
    + service > book.js 
            --> cop từ user     
        + export const getBooks = ({...}) => new Promise(async(res, rej) => {...})
            + page , name , limit , order , ...query
                    --> giá trị truyền vào đầu
            + try{...}catch(error){...}
                    --> giá trị trong Promise 
                + const queries = {raw : true , nest : true}
                        --> raw : 
                        --> nest : 
                + const offset = (!page || +page < 1) ? 0 : (+page - 1)
                        --> hàm dùng chọn trang 
                        --> không có page thì sẽ là page đầu ( page[0] )
                + queries
                + ... tự làm tiếp
    

                     