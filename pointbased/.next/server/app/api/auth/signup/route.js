/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/auth/signup/route";
exports.ids = ["app/api/auth/signup/route"];
exports.modules = {

/***/ "(rsc)/./app/api/auth/signup/route.ts":
/*!**************************************!*\
  !*** ./app/api/auth/signup/route.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../lib/db */ \"(rsc)/./lib/db.ts\");\n/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bcrypt */ \"bcrypt\");\n/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(bcrypt__WEBPACK_IMPORTED_MODULE_2__);\n// app/api/auth/signup/route.ts\n\n\n\nasync function POST(request) {\n    try {\n        const { name, email, mobile, password } = await request.json();\n        // Validate input\n        if (!name || !email || !mobile || !password) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: 'Missing required fields'\n            }, {\n                status: 400\n            });\n        }\n        // Check if user already exists - wrapped in try/catch to handle SQLite errors\n        try {\n            const existingUser = _lib_db__WEBPACK_IMPORTED_MODULE_1__[\"default\"].prepare('SELECT email FROM users WHERE email = ?').get(email);\n            if (existingUser) {\n                return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                    error: 'User with this email already exists'\n                }, {\n                    status: 409\n                });\n            }\n        } catch (dbError) {\n            console.error('Database error checking existing user:', dbError);\n        // If this is the first run and table doesn't exist yet, continue\n        }\n        // Hash password\n        const hashedPassword = await (0,bcrypt__WEBPACK_IMPORTED_MODULE_2__.hash)(password, 10);\n        try {\n            // Insert new user\n            const insertUser = _lib_db__WEBPACK_IMPORTED_MODULE_1__[\"default\"].prepare('INSERT INTO users (name, email, mobile, password) VALUES (?, ?, ?, ?)');\n            insertUser.run(name, email, mobile, hashedPassword);\n            // Fetch the newly created user to return full user data\n            const createdUser = _lib_db__WEBPACK_IMPORTED_MODULE_1__[\"default\"].prepare('SELECT id, name, email, mobile FROM users WHERE email = ?').get(email);\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                message: 'User created successfully',\n                user: createdUser\n            }, {\n                status: 201\n            });\n        } catch (insertError) {\n            console.error('Error inserting user:', insertError);\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: 'Failed to create user'\n            }, {\n                status: 500\n            });\n        }\n    } catch (error) {\n        console.error('Signup error:', error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: 'Internal server error'\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2F1dGgvc2lnbnVwL3JvdXRlLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsK0JBQStCO0FBQ3lCO0FBQ1Y7QUFDaEI7QUFFdkIsZUFBZUcsS0FBS0MsT0FBb0I7SUFDN0MsSUFBSTtRQUNGLE1BQU0sRUFBRUMsSUFBSSxFQUFFQyxLQUFLLEVBQUVDLE1BQU0sRUFBRUMsUUFBUSxFQUFFLEdBQUcsTUFBTUosUUFBUUssSUFBSTtRQUU1RCxpQkFBaUI7UUFDakIsSUFBSSxDQUFDSixRQUFRLENBQUNDLFNBQVMsQ0FBQ0MsVUFBVSxDQUFDQyxVQUFVO1lBQzNDLE9BQU9SLHFEQUFZQSxDQUFDUyxJQUFJLENBQ3RCO2dCQUFFQyxPQUFPO1lBQTBCLEdBQ25DO2dCQUFFQyxRQUFRO1lBQUk7UUFFbEI7UUFFQSw4RUFBOEU7UUFDOUUsSUFBSTtZQUNGLE1BQU1DLGVBQWVYLCtDQUFFQSxDQUNwQlksT0FBTyxDQUFDLDJDQUNSQyxHQUFHLENBQUNSO1lBRVAsSUFBSU0sY0FBYztnQkFDaEIsT0FBT1oscURBQVlBLENBQUNTLElBQUksQ0FDdEI7b0JBQUVDLE9BQU87Z0JBQXNDLEdBQy9DO29CQUFFQyxRQUFRO2dCQUFJO1lBRWxCO1FBQ0YsRUFBRSxPQUFPSSxTQUFTO1lBQ2hCQyxRQUFRTixLQUFLLENBQUMsMENBQTBDSztRQUN4RCxpRUFBaUU7UUFDbkU7UUFFQSxnQkFBZ0I7UUFDaEIsTUFBTUUsaUJBQWlCLE1BQU1mLDRDQUFJQSxDQUFDTSxVQUFVO1FBRTVDLElBQUk7WUFDRixrQkFBa0I7WUFDbEIsTUFBTVUsYUFBYWpCLCtDQUFFQSxDQUFDWSxPQUFPLENBQzNCO1lBR0ZLLFdBQVdDLEdBQUcsQ0FBQ2QsTUFBTUMsT0FBT0MsUUFBUVU7WUFFcEMsd0RBQXdEO1lBQ3hELE1BQU1HLGNBQWNuQiwrQ0FBRUEsQ0FDbkJZLE9BQU8sQ0FBQyw2REFDUkMsR0FBRyxDQUFDUjtZQUVQLE9BQU9OLHFEQUFZQSxDQUFDUyxJQUFJLENBQ3RCO2dCQUNFWSxTQUFTO2dCQUNUQyxNQUFNRjtZQUNSLEdBQ0E7Z0JBQUVULFFBQVE7WUFBSTtRQUVsQixFQUFFLE9BQU9ZLGFBQWE7WUFDcEJQLFFBQVFOLEtBQUssQ0FBQyx5QkFBeUJhO1lBQ3ZDLE9BQU92QixxREFBWUEsQ0FBQ1MsSUFBSSxDQUN0QjtnQkFBRUMsT0FBTztZQUF3QixHQUNqQztnQkFBRUMsUUFBUTtZQUFJO1FBRWxCO0lBQ0YsRUFBRSxPQUFPRCxPQUFPO1FBQ2RNLFFBQVFOLEtBQUssQ0FBQyxpQkFBaUJBO1FBQy9CLE9BQU9WLHFEQUFZQSxDQUFDUyxJQUFJLENBQ3RCO1lBQUVDLE9BQU87UUFBd0IsR0FDakM7WUFBRUMsUUFBUTtRQUFJO0lBRWxCO0FBQ0YiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcYW51c2hcXERlc2t0b3BcXHByb2plY3RzXFxkYm1zIHByb2plY3RcXFBvaW50LUJhc2VkLVJlY3ljbGluZy1zeXN0ZW1cXHBvaW50YmFzZWRcXGFwcFxcYXBpXFxhdXRoXFxzaWdudXBcXHJvdXRlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGFwcC9hcGkvYXV0aC9zaWdudXAvcm91dGUudHNcclxuaW1wb3J0IHsgTmV4dFJlcXVlc3QsIE5leHRSZXNwb25zZSB9IGZyb20gJ25leHQvc2VydmVyJztcclxuaW1wb3J0IGRiLCB7IFVzZXIgfSBmcm9tICcuLi8uLi8uLi8uLi9saWIvZGInO1xyXG5pbXBvcnQgeyBoYXNoIH0gZnJvbSAnYmNyeXB0JztcclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQT1NUKHJlcXVlc3Q6IE5leHRSZXF1ZXN0KSB7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHsgbmFtZSwgZW1haWwsIG1vYmlsZSwgcGFzc3dvcmQgfSA9IGF3YWl0IHJlcXVlc3QuanNvbigpO1xyXG5cclxuICAgIC8vIFZhbGlkYXRlIGlucHV0XHJcbiAgICBpZiAoIW5hbWUgfHwgIWVtYWlsIHx8ICFtb2JpbGUgfHwgIXBhc3N3b3JkKSB7XHJcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcclxuICAgICAgICB7IGVycm9yOiAnTWlzc2luZyByZXF1aXJlZCBmaWVsZHMnIH0sXHJcbiAgICAgICAgeyBzdGF0dXM6IDQwMCB9XHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ2hlY2sgaWYgdXNlciBhbHJlYWR5IGV4aXN0cyAtIHdyYXBwZWQgaW4gdHJ5L2NhdGNoIHRvIGhhbmRsZSBTUUxpdGUgZXJyb3JzXHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBleGlzdGluZ1VzZXIgPSBkYlxyXG4gICAgICAgIC5wcmVwYXJlKCdTRUxFQ1QgZW1haWwgRlJPTSB1c2VycyBXSEVSRSBlbWFpbCA9ID8nKVxyXG4gICAgICAgIC5nZXQoZW1haWwpIGFzIHsgZW1haWw6IHN0cmluZyB9IHwgdW5kZWZpbmVkO1xyXG4gICAgICAgIFxyXG4gICAgICBpZiAoZXhpc3RpbmdVc2VyKSB7XHJcbiAgICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxyXG4gICAgICAgICAgeyBlcnJvcjogJ1VzZXIgd2l0aCB0aGlzIGVtYWlsIGFscmVhZHkgZXhpc3RzJyB9LFxyXG4gICAgICAgICAgeyBzdGF0dXM6IDQwOSB9XHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZGJFcnJvcikge1xyXG4gICAgICBjb25zb2xlLmVycm9yKCdEYXRhYmFzZSBlcnJvciBjaGVja2luZyBleGlzdGluZyB1c2VyOicsIGRiRXJyb3IpO1xyXG4gICAgICAvLyBJZiB0aGlzIGlzIHRoZSBmaXJzdCBydW4gYW5kIHRhYmxlIGRvZXNuJ3QgZXhpc3QgeWV0LCBjb250aW51ZVxyXG4gICAgfVxyXG5cclxuICAgIC8vIEhhc2ggcGFzc3dvcmRcclxuICAgIGNvbnN0IGhhc2hlZFBhc3N3b3JkID0gYXdhaXQgaGFzaChwYXNzd29yZCwgMTApO1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIC8vIEluc2VydCBuZXcgdXNlclxyXG4gICAgICBjb25zdCBpbnNlcnRVc2VyID0gZGIucHJlcGFyZShcclxuICAgICAgICAnSU5TRVJUIElOVE8gdXNlcnMgKG5hbWUsIGVtYWlsLCBtb2JpbGUsIHBhc3N3b3JkKSBWQUxVRVMgKD8sID8sID8sID8pJ1xyXG4gICAgICApO1xyXG4gICAgICBcclxuICAgICAgaW5zZXJ0VXNlci5ydW4obmFtZSwgZW1haWwsIG1vYmlsZSwgaGFzaGVkUGFzc3dvcmQpO1xyXG5cclxuICAgICAgLy8gRmV0Y2ggdGhlIG5ld2x5IGNyZWF0ZWQgdXNlciB0byByZXR1cm4gZnVsbCB1c2VyIGRhdGFcclxuICAgICAgY29uc3QgY3JlYXRlZFVzZXIgPSBkYlxyXG4gICAgICAgIC5wcmVwYXJlKCdTRUxFQ1QgaWQsIG5hbWUsIGVtYWlsLCBtb2JpbGUgRlJPTSB1c2VycyBXSEVSRSBlbWFpbCA9ID8nKVxyXG4gICAgICAgIC5nZXQoZW1haWwpIGFzIHsgaWQ6IG51bWJlcjsgbmFtZTogc3RyaW5nOyBlbWFpbDogc3RyaW5nOyBtb2JpbGU6IHN0cmluZyB9IHwgdW5kZWZpbmVkO1xyXG5cclxuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxyXG4gICAgICAgIHsgXHJcbiAgICAgICAgICBtZXNzYWdlOiAnVXNlciBjcmVhdGVkIHN1Y2Nlc3NmdWxseScsXHJcbiAgICAgICAgICB1c2VyOiBjcmVhdGVkVXNlclxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgeyBzdGF0dXM6IDIwMSB9XHJcbiAgICAgICk7XHJcbiAgICB9IGNhdGNoIChpbnNlcnRFcnJvcikge1xyXG4gICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBpbnNlcnRpbmcgdXNlcjonLCBpbnNlcnRFcnJvcik7XHJcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcclxuICAgICAgICB7IGVycm9yOiAnRmFpbGVkIHRvIGNyZWF0ZSB1c2VyJyB9LFxyXG4gICAgICAgIHsgc3RhdHVzOiA1MDAgfVxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKCdTaWdudXAgZXJyb3I6JywgZXJyb3IpO1xyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxyXG4gICAgICB7IGVycm9yOiAnSW50ZXJuYWwgc2VydmVyIGVycm9yJyB9LFxyXG4gICAgICB7IHN0YXR1czogNTAwIH1cclxuICAgICk7XHJcbiAgfVxyXG59XHJcbiJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJkYiIsImhhc2giLCJQT1NUIiwicmVxdWVzdCIsIm5hbWUiLCJlbWFpbCIsIm1vYmlsZSIsInBhc3N3b3JkIiwianNvbiIsImVycm9yIiwic3RhdHVzIiwiZXhpc3RpbmdVc2VyIiwicHJlcGFyZSIsImdldCIsImRiRXJyb3IiLCJjb25zb2xlIiwiaGFzaGVkUGFzc3dvcmQiLCJpbnNlcnRVc2VyIiwicnVuIiwiY3JlYXRlZFVzZXIiLCJtZXNzYWdlIiwidXNlciIsImluc2VydEVycm9yIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/auth/signup/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/db.ts":
/*!*******************!*\
  !*** ./lib/db.ts ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   initializeDb: () => (/* binding */ initializeDb)\n/* harmony export */ });\n/* harmony import */ var better_sqlite3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! better-sqlite3 */ \"better-sqlite3\");\n/* harmony import */ var better_sqlite3__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(better_sqlite3__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\n// Ensure database directory exists\nconst dbDir = (0,path__WEBPACK_IMPORTED_MODULE_1__.join)(process.cwd(), 'database');\nif (!fs__WEBPACK_IMPORTED_MODULE_2___default().existsSync(dbDir)) {\n    fs__WEBPACK_IMPORTED_MODULE_2___default().mkdirSync(dbDir, {\n        recursive: true\n    });\n}\nconst dbPath = (0,path__WEBPACK_IMPORTED_MODULE_1__.join)(dbDir, 'eco-rewards.db');\nconst db = new (better_sqlite3__WEBPACK_IMPORTED_MODULE_0___default())(dbPath);\n// Initialize database tables\nfunction initializeDb() {\n    // Users table with points column\n    db.exec(`\n    CREATE TABLE IF NOT EXISTS users (\n      id INTEGER PRIMARY KEY AUTOINCREMENT,\n      name TEXT NOT NULL,\n      email TEXT UNIQUE NOT NULL,\n      mobile TEXT NOT NULL,\n      password TEXT NOT NULL,\n      points INTEGER DEFAULT 0,\n      created_at DATETIME DEFAULT CURRENT_TIMESTAMP\n    );\n  `);\n    // Purchases table\n    db.exec(`\n  CREATE TABLE IF NOT EXISTS purchases (\n    id INTEGER PRIMARY KEY AUTOINCREMENT,\n    user_id INTEGER NOT NULL,\n    total_amount REAL NOT NULL,\n    payment_method TEXT NOT NULL,\n    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,\n    submission_location TEXT,\n    FOREIGN KEY (user_id) REFERENCES users(id)\n  );\n  `);\n    // Purchase_items table with is_reward column\n    db.exec(`\n    CREATE TABLE IF NOT EXISTS purchase_items (\n      id INTEGER PRIMARY KEY AUTOINCREMENT,\n      purchase_id INTEGER NOT NULL,\n      item_id TEXT NOT NULL,\n      name TEXT NOT NULL,\n      size TEXT NOT NULL,\n      quantity INTEGER NOT NULL,\n      price REAL NOT NULL,\n      image TEXT,\n      is_reward BOOLEAN DEFAULT 0,\n      FOREIGN KEY (purchase_id) REFERENCES purchases(id)\n    );\n  `);\n}\n// Initialize the database on module import\ninitializeDb();\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (db);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvZGIudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBc0M7QUFDVjtBQUNSO0FBYXBCLG1DQUFtQztBQUNuQyxNQUFNRyxRQUFRRiwwQ0FBSUEsQ0FBQ0csUUFBUUMsR0FBRyxJQUFJO0FBQ2xDLElBQUksQ0FBQ0gsb0RBQWEsQ0FBQ0MsUUFBUTtJQUN6QkQsbURBQVksQ0FBQ0MsT0FBTztRQUFFSyxXQUFXO0lBQUs7QUFDeEM7QUFFQSxNQUFNQyxTQUFTUiwwQ0FBSUEsQ0FBQ0UsT0FBTztBQUMzQixNQUFNTyxLQUFLLElBQUlWLHVEQUFRQSxDQUFDUztBQUV4Qiw2QkFBNkI7QUFDdEIsU0FBU0U7SUFDZCxpQ0FBaUM7SUFDakNELEdBQUdFLElBQUksQ0FBQyxDQUFDOzs7Ozs7Ozs7O0VBVVQsQ0FBQztJQUVELGtCQUFrQjtJQUNsQkYsR0FBR0UsSUFBSSxDQUFDLENBQUM7Ozs7Ozs7Ozs7RUFVVCxDQUFDO0lBRUQsNkNBQTZDO0lBQzdDRixHQUFHRSxJQUFJLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7OztFQWFULENBQUM7QUFDSDtBQUVBLDJDQUEyQztBQUMzQ0Q7QUFFQSxpRUFBZUQsRUFBRUEsRUFBQyIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxhbnVzaFxcRGVza3RvcFxccHJvamVjdHNcXGRibXMgcHJvamVjdFxcUG9pbnQtQmFzZWQtUmVjeWNsaW5nLXN5c3RlbVxccG9pbnRiYXNlZFxcbGliXFxkYi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRGF0YWJhc2UgZnJvbSAnYmV0dGVyLXNxbGl0ZTMnO1xyXG5pbXBvcnQgeyBqb2luIH0gZnJvbSAncGF0aCc7XHJcbmltcG9ydCBmcyBmcm9tICdmcyc7XHJcblxyXG4vLyBEZWZpbmUgdXNlciB0eXBlXHJcbmV4cG9ydCBpbnRlcmZhY2UgVXNlciB7XHJcbiAgaWQ6IG51bWJlcjtcclxuICBuYW1lOiBzdHJpbmc7XHJcbiAgZW1haWw6IHN0cmluZztcclxuICBtb2JpbGU6IHN0cmluZztcclxuICBwYXNzd29yZDogc3RyaW5nO1xyXG4gIGNyZWF0ZWRfYXQ6IHN0cmluZztcclxuICBwb2ludHM6IG51bWJlcjtcclxufVxyXG5cclxuLy8gRW5zdXJlIGRhdGFiYXNlIGRpcmVjdG9yeSBleGlzdHNcclxuY29uc3QgZGJEaXIgPSBqb2luKHByb2Nlc3MuY3dkKCksICdkYXRhYmFzZScpO1xyXG5pZiAoIWZzLmV4aXN0c1N5bmMoZGJEaXIpKSB7XHJcbiAgZnMubWtkaXJTeW5jKGRiRGlyLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcclxufVxyXG5cclxuY29uc3QgZGJQYXRoID0gam9pbihkYkRpciwgJ2Vjby1yZXdhcmRzLmRiJyk7XHJcbmNvbnN0IGRiID0gbmV3IERhdGFiYXNlKGRiUGF0aCk7XHJcblxyXG4vLyBJbml0aWFsaXplIGRhdGFiYXNlIHRhYmxlc1xyXG5leHBvcnQgZnVuY3Rpb24gaW5pdGlhbGl6ZURiKCkge1xyXG4gIC8vIFVzZXJzIHRhYmxlIHdpdGggcG9pbnRzIGNvbHVtblxyXG4gIGRiLmV4ZWMoYFxyXG4gICAgQ1JFQVRFIFRBQkxFIElGIE5PVCBFWElTVFMgdXNlcnMgKFxyXG4gICAgICBpZCBJTlRFR0VSIFBSSU1BUlkgS0VZIEFVVE9JTkNSRU1FTlQsXHJcbiAgICAgIG5hbWUgVEVYVCBOT1QgTlVMTCxcclxuICAgICAgZW1haWwgVEVYVCBVTklRVUUgTk9UIE5VTEwsXHJcbiAgICAgIG1vYmlsZSBURVhUIE5PVCBOVUxMLFxyXG4gICAgICBwYXNzd29yZCBURVhUIE5PVCBOVUxMLFxyXG4gICAgICBwb2ludHMgSU5URUdFUiBERUZBVUxUIDAsXHJcbiAgICAgIGNyZWF0ZWRfYXQgREFURVRJTUUgREVGQVVMVCBDVVJSRU5UX1RJTUVTVEFNUFxyXG4gICAgKTtcclxuICBgKTtcclxuXHJcbiAgLy8gUHVyY2hhc2VzIHRhYmxlXHJcbiAgZGIuZXhlYyhgXHJcbiAgQ1JFQVRFIFRBQkxFIElGIE5PVCBFWElTVFMgcHVyY2hhc2VzIChcclxuICAgIGlkIElOVEVHRVIgUFJJTUFSWSBLRVkgQVVUT0lOQ1JFTUVOVCxcclxuICAgIHVzZXJfaWQgSU5URUdFUiBOT1QgTlVMTCxcclxuICAgIHRvdGFsX2Ftb3VudCBSRUFMIE5PVCBOVUxMLFxyXG4gICAgcGF5bWVudF9tZXRob2QgVEVYVCBOT1QgTlVMTCxcclxuICAgIGNyZWF0ZWRfYXQgREFURVRJTUUgREVGQVVMVCBDVVJSRU5UX1RJTUVTVEFNUCxcclxuICAgIHN1Ym1pc3Npb25fbG9jYXRpb24gVEVYVCxcclxuICAgIEZPUkVJR04gS0VZICh1c2VyX2lkKSBSRUZFUkVOQ0VTIHVzZXJzKGlkKVxyXG4gICk7XHJcbiAgYCk7XHJcblxyXG4gIC8vIFB1cmNoYXNlX2l0ZW1zIHRhYmxlIHdpdGggaXNfcmV3YXJkIGNvbHVtblxyXG4gIGRiLmV4ZWMoYFxyXG4gICAgQ1JFQVRFIFRBQkxFIElGIE5PVCBFWElTVFMgcHVyY2hhc2VfaXRlbXMgKFxyXG4gICAgICBpZCBJTlRFR0VSIFBSSU1BUlkgS0VZIEFVVE9JTkNSRU1FTlQsXHJcbiAgICAgIHB1cmNoYXNlX2lkIElOVEVHRVIgTk9UIE5VTEwsXHJcbiAgICAgIGl0ZW1faWQgVEVYVCBOT1QgTlVMTCxcclxuICAgICAgbmFtZSBURVhUIE5PVCBOVUxMLFxyXG4gICAgICBzaXplIFRFWFQgTk9UIE5VTEwsXHJcbiAgICAgIHF1YW50aXR5IElOVEVHRVIgTk9UIE5VTEwsXHJcbiAgICAgIHByaWNlIFJFQUwgTk9UIE5VTEwsXHJcbiAgICAgIGltYWdlIFRFWFQsXHJcbiAgICAgIGlzX3Jld2FyZCBCT09MRUFOIERFRkFVTFQgMCxcclxuICAgICAgRk9SRUlHTiBLRVkgKHB1cmNoYXNlX2lkKSBSRUZFUkVOQ0VTIHB1cmNoYXNlcyhpZClcclxuICAgICk7XHJcbiAgYCk7XHJcbn1cclxuXHJcbi8vIEluaXRpYWxpemUgdGhlIGRhdGFiYXNlIG9uIG1vZHVsZSBpbXBvcnRcclxuaW5pdGlhbGl6ZURiKCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkYjsiXSwibmFtZXMiOlsiRGF0YWJhc2UiLCJqb2luIiwiZnMiLCJkYkRpciIsInByb2Nlc3MiLCJjd2QiLCJleGlzdHNTeW5jIiwibWtkaXJTeW5jIiwicmVjdXJzaXZlIiwiZGJQYXRoIiwiZGIiLCJpbml0aWFsaXplRGIiLCJleGVjIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/db.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Fsignup%2Froute&page=%2Fapi%2Fauth%2Fsignup%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fsignup%2Froute.ts&appDir=C%3A%5CUsers%5Canush%5CDesktop%5Cprojects%5Cdbms%20project%5CPoint-Based-Recycling-system%5Cpointbased%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Canush%5CDesktop%5Cprojects%5Cdbms%20project%5CPoint-Based-Recycling-system%5Cpointbased&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Fsignup%2Froute&page=%2Fapi%2Fauth%2Fsignup%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fsignup%2Froute.ts&appDir=C%3A%5CUsers%5Canush%5CDesktop%5Cprojects%5Cdbms%20project%5CPoint-Based-Recycling-system%5Cpointbased%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Canush%5CDesktop%5Cprojects%5Cdbms%20project%5CPoint-Based-Recycling-system%5Cpointbased&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_anush_Desktop_projects_dbms_project_Point_Based_Recycling_system_pointbased_app_api_auth_signup_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/auth/signup/route.ts */ \"(rsc)/./app/api/auth/signup/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/auth/signup/route\",\n        pathname: \"/api/auth/signup\",\n        filename: \"route\",\n        bundlePath: \"app/api/auth/signup/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\anush\\\\Desktop\\\\projects\\\\dbms project\\\\Point-Based-Recycling-system\\\\pointbased\\\\app\\\\api\\\\auth\\\\signup\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_anush_Desktop_projects_dbms_project_Point_Based_Recycling_system_pointbased_app_api_auth_signup_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZhdXRoJTJGc2lnbnVwJTJGcm91dGUmcGFnZT0lMkZhcGklMkZhdXRoJTJGc2lnbnVwJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGYXV0aCUyRnNpZ251cCUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNhbnVzaCU1Q0Rlc2t0b3AlNUNwcm9qZWN0cyU1Q2RibXMlMjBwcm9qZWN0JTVDUG9pbnQtQmFzZWQtUmVjeWNsaW5nLXN5c3RlbSU1Q3BvaW50YmFzZWQlNUNhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPUMlM0ElNUNVc2VycyU1Q2FudXNoJTVDRGVza3RvcCU1Q3Byb2plY3RzJTVDZGJtcyUyMHByb2plY3QlNUNQb2ludC1CYXNlZC1SZWN5Y2xpbmctc3lzdGVtJTVDcG9pbnRiYXNlZCZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBK0Y7QUFDdkM7QUFDcUI7QUFDNkU7QUFDMUo7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlHQUFtQjtBQUMzQztBQUNBLGNBQWMsa0VBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzREFBc0Q7QUFDOUQ7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDMEY7O0FBRTFGIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIkM6XFxcXFVzZXJzXFxcXGFudXNoXFxcXERlc2t0b3BcXFxccHJvamVjdHNcXFxcZGJtcyBwcm9qZWN0XFxcXFBvaW50LUJhc2VkLVJlY3ljbGluZy1zeXN0ZW1cXFxccG9pbnRiYXNlZFxcXFxhcHBcXFxcYXBpXFxcXGF1dGhcXFxcc2lnbnVwXFxcXHJvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9hdXRoL3NpZ251cC9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL2F1dGgvc2lnbnVwXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9hdXRoL3NpZ251cC9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIkM6XFxcXFVzZXJzXFxcXGFudXNoXFxcXERlc2t0b3BcXFxccHJvamVjdHNcXFxcZGJtcyBwcm9qZWN0XFxcXFBvaW50LUJhc2VkLVJlY3ljbGluZy1zeXN0ZW1cXFxccG9pbnRiYXNlZFxcXFxhcHBcXFxcYXBpXFxcXGF1dGhcXFxcc2lnbnVwXFxcXHJvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Fsignup%2Froute&page=%2Fapi%2Fauth%2Fsignup%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fsignup%2Froute.ts&appDir=C%3A%5CUsers%5Canush%5CDesktop%5Cprojects%5Cdbms%20project%5CPoint-Based-Recycling-system%5Cpointbased%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Canush%5CDesktop%5Cprojects%5Cdbms%20project%5CPoint-Based-Recycling-system%5Cpointbased&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "bcrypt":
/*!*************************!*\
  !*** external "bcrypt" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("bcrypt");

/***/ }),

/***/ "better-sqlite3":
/*!*********************************!*\
  !*** external "better-sqlite3" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = require("better-sqlite3");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Fsignup%2Froute&page=%2Fapi%2Fauth%2Fsignup%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fsignup%2Froute.ts&appDir=C%3A%5CUsers%5Canush%5CDesktop%5Cprojects%5Cdbms%20project%5CPoint-Based-Recycling-system%5Cpointbased%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Canush%5CDesktop%5Cprojects%5Cdbms%20project%5CPoint-Based-Recycling-system%5Cpointbased&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();