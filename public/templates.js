angular.module("MyApp").run(["$templateCache", function($templateCache) {$templateCache.put("views/faq.html","<div class=\"container\">\n  <div class=\"panel panel-default\">\n    <div class=\"panel-heading\">\n      {{headingTitle}}\n    </div>\n    <div class=\"panel-body\">\n      <div class=\"panel-group\" data-allow-multiple=\"true\" role=\"tablist\" aria-multiselectable=\"true\" bs-collapse>\n        <div class=\"panel panel-default\">\n          <div class=\"panel-heading\" role=\"tab\">\n            <h4 class=\"panel-title\">\n              <a bs-collapse-toggle>\n                What is BitCoinTracker?\n              </a>\n            </h4>\n          </div>\n        <div class=\"panel-collapse\" role=\"tabpanel\" bs-collapse-target>\n          <div class=\"panel-body\">\n            Itis blah blah\n          </div>\n        </div>\n      </div>\n      <div class=\"panel panel-default\">\n        <div class=\"panel-heading\" role=\"tab\">\n          <h4 class=\"panel-title\">\n            <a bs-collapse-toggle>\n              What is BitCoinTracker?\n            </a>\n          </h4>\n        </div>\n      <div class=\"panel-collapse\" role=\"tabpanel\" bs-collapse-target>\n        <div class=\"panel-body\">\n          Itis blah blah\n        </div>\n      </div>\n    </div>\n    </div>\n    </div>\n  </div>\n</div>\n");
$templateCache.put("views/forgot.html","");
$templateCache.put("views/home.html","<div class=\"container\">\n  <div class=\"panel panel-default\">\n    <div class=\"panel-heading\">\n      {{headingTitle}}\n    </div>\n    <div class=\"panel-body\">\n\n    </div>\n  </div>\n</div>\n");
$templateCache.put("views/login.html","<div class=\"container\">\n  <div class=\"row\">\n    <div class=\"center-form panel\">\n      <div class=\"panel-body\">\n        <h2 class=\"text-center\">Login</h2>\n\n        <form method=\"post\" ng-submit=\"login()\" name=\"loginForm\">\n\n          <div class=\"form-group\">\n            <input class=\"form-control input-lg\" type=\"text\" name=\"email\"\n                   ng-model=\"email\" placeholder=\"Email\" required autofocus>\n          </div>\n\n          <div class=\"form-group\">\n            <input class=\"form-control input-lg\" type=\"password\" name=\"password\"\n                   ng-model=\"password\" placeholder=\"Password\" required>\n          </div>\n\n          <button type=\"submit\" ng-disabled=\"loginForm.$invalid\"\n                  class=\"btn btn-lg btn-block btn-success\">Sign In\n          </button>\n        </form>\n      </div>\n    </div>\n  </div>\n</div>\n");
$templateCache.put("views/profile.html","<div class=\"container\">\n  <div class=\"panel panel-default\">\n    <div class=\"panel-heading\">\n      Profile\n    </div>\n    <div class=\"panel-body\">\n\n      <!--  Area to display Total net profit / loss\n            Bitcoin price\n            Other stats\n      -->\n\n      <!-- Maybe some navigation buttons -->\n\n      <!--\n\n      -->\n      <p>You have {{transactions.length}} transactions</p>\n      <table class=\"table table-striped\" data-allow-multiple=\"true\" bs-collapse>\n        <thead>\n          <th><a href=\"#\" ng-click=\"sortType = \'date\'; sortReverse = !sortReverse\">\n            <span ng-show=\"sortType == \'date\' && !sortReverse\" class=\"fa fa-caret-down\"></span>\n            <span ng-show=\"sortType == \'date\' && sortReverse\" class=\"fa fa-caret-up\"></span>\n            Date\n          </th>\n          <th>\n            <a href=\"#\" ng-click=\"sortType = \'amount\'; sortReverse = !sortReverse\">\n            <span ng-show=\"sortType == \'amount\' && !sortReverse\" class=\"fa fa-caret-down\"></span>\n            <span ng-show=\"sortType == \'amount\' && sortReverse\" class=\"fa fa-caret-up\"></span>\n            Amount (<i class=\"fa fa-btc\"></i>)</th>\n          <th>\n            <a href=\"#\" ng-click=\"sortType = \'buyValue\'; sortReverse = !sortReverse\">\n            <span ng-show=\"sortType == \'buyValue\' && !sortReverse\" class=\"fa fa-caret-down\"></span>\n            <span ng-show=\"sortType == \'buyValue\' && sortReverse\" class=\"fa fa-caret-up\"></span>\n            Buy value ($)\n          </th>\n          <th>\n            Value now ($)\n          </th>\n          <th>Edit</th>\n          <th>Delete</th>\n        </thead>\n          <!--<th>Value now/ Sell value</th>-->\n          <tr ng-repeat-start=\"transaction in transactions | orderBy:sortType:sortReverse\" data-allow-multiple=\"true\" aria-multiselectable=\"true\" class=\"clickable\" bs-collapse-toggle >\n            <td><a href=\"#\" >{{transaction.date | date:\'dd/MM/yyyy\'}}</a></td>\n            <td>{{ transaction.amount }}</td>\n            <td>${{ transaction.buyValue }}</td>\n            <td>{{ transaction.amount * price.usd | currency }}</td>\n            <td><span class=\"glyphicon glyphicon-edit\" ng-click=\"editTransaction(transaction); showAddTransaction=false\"></span></td>\n            <td><span class=\"glyphicon glyphicon-trash\" ng-click=\"areYouSure(transaction)\"></span></td>\n            <tr ng-repeat-end  bs-collapse-target>\n                <td colspan=6>htrg</td>\n            </tr>\n          </tr>\n\n      </table>\n\n\n      <!--\n          add Transaction form\n      -->\n  <!-- Yet to implement annimation using ngAnimate -->\n  <button type=\"button\" class=\"btn btn-lg btn-warning\" ng-click=\"showAddTransaction=!showAddTransaction; showEditTransaction=false\">Add Transaction</button>\n      <div id=\"addTransaction\" ng-if=\"showAddTransaction && !showEditTransaction\">\n        <div class=\"row\">\n          <div class=\"center-form panel\">\n            <form method=\"post\" ng-submit=\"addTransaction()\" name=\"addTransactionForm\">\n              <div class=\"panel-body\">\n                <h2 class=\"text-center\">Add Transaction</h2>\n\n                <div class=\"form-group\"\n                     ng-class=\"{ \'has-success\' : addTransactionForm.amount.$valid && addTransactionForm.amount.$dirty, \'has-error\' : addTransactionForm.amount.$invalid && addTransactionForm.amount.$dirty }\">\n                  <input class=\"form-control input-lg\" type=\"number\" id=\"amount\"\n                         name=\"amount\" ng-model=\"$parent.amount\" step=\"any\" min=\"0\" placeholder=\"Buy Amount\" required\n                         autofocus>\n\n                  <div class=\"help-block text-danger\" ng-if=\"addTransactionForm.amount.$dirty\"\n                       ng-messages=\"addTransactionForm.amount.$error\">\n                    <div ng-message=\"required\">You must enter an amount</div>\n                    <div ng-message=\"number\">Amount is invalid. Must be greater than 0</div>\n                  </div>\n                </div>\n\n                <div class=\"form-group\"\n                     ng-class=\"{ \'has-success\' : addTransactionForm.buyValue.$valid && addTransactionForm.buyValue.$dirty, \'has-error\' : addTransactionForm.buyValue.$invalid && addTransactionForm.buyValue.$dirty }\">\n                  <input class=\"form-control input-lg\" type=\"number\" id=\"buyValue\"\n                         name=\"buyValue\" ng-model=\"$parent.buyValue\" step=\"any\" min=\"0\" placeholder=\"Buy Value ($)\" required\n                         autofocus>\n\n                  <div class=\"help-block text-danger\" ng-if=\"addTransactionForm.buyValue.$dirty\"\n                       ng-messages=\"addTransactionForm.buyValue.$error\">\n                    <div ng-message=\"required\">You must enter a buy value</div>\n                    <div ng-message=\"number\">Buy value is invalid. Must be greater than $0</div>\n                  </div>\n                </div>\n\n                <div class=\"form-group\" ng-class=\"{\'has-error\': addTransactionForm.date.$invalid}\">\n                  <label class=\"control-label\"><i class=\"fa fa-calendar\"></i> Date <small>(optional)</small></label>\n                  <input type=\"text\" class=\"form-control\" ng-model=\"$parent.selectedDate\" name=\"date\" bs-datepicker>\n                </div>\n\n                <button type=\"submit\" ng-disabled=\"addTransactionForm.$invalid\"\n                        class=\"btn btn-lg btn-block btn-warning\">Add\n                </button>\n              </div>\n            </form>\n          </div>\n        </div>\n      </div>\n      <!--\n     Edit Transactions\n     -->\n     <div id=\"editTransaction\" ng-if=\"showEditTransaction\">\n       <div class=\"row\">\n         <div class=\"center-form panel\">\n           <form method=\"post\" ng-submit=\"doEditTransaction(transactionToEdit_id)\" name=\"editTransactionForm\">\n             <div class=\"panel-body\">\n               <h2 class=\"text-center\">Edit Transaction</h2>\n\n               <div class=\"form-group\"\n                    ng-class=\"{ \'has-success\' : editTransactionForm.amount.$valid && editTransactionForm.amount.$dirty, \'has-error\' : editTransactionForm.amount.$invalid && editTransactionForm.amount.$dirty }\">\n                 <input class=\"form-control input-lg\" type=\"number\" id=\"amount\"\n                        name=\"amount\" ng-model=\"transactionToEdit.amount\" step=\"any\" min=\"0\" required autofocus>\n\n                 <div class=\"help-block text-danger\" ng-if=\"editTransactionForm.amount.$dirty\"\n                      ng-messages=\"editTransactionForm.amount.$error\">\n                   <div ng-message=\"required\">You must enter an amount</div>\n                   <div ng-message=\"number\">Amount is invalid. Must be greater than 0</div>\n                 </div>\n               </div>\n\n               <div class=\"form-group\"\n                    ng-class=\"{ \'has-success\' : editTransactionForm.buyValue.$valid && editTransactionForm.buyValue.$dirty, \'has-error\' : editTransactionForm.buyValue.$invalid && editTransactionForm.buyValue.$dirty }\">\n                 <input class=\"form-control input-lg\" type=\"text\" id=\"buyValue\"\n                        name=\"buyValue\" ng-model=\"transactionToEdit.buyValue\" step=\"any\" min=\"0\" required autofocus>\n\n                 <div class=\"help-block text-danger\" ng-if=\"editTransactionForm.buyValue.$dirty\"\n                      ng-messages=\"editTransactionForm.buyValue.$error\">\n                   <div ng-message=\"required\">You must enter a buy value</div>\n                   <div ng-message=\"number\">Buy value is invalid. Must be greater than $0</div>\n                 </div>\n               </div>\n\n               <button type=\"submit\" ng-disabled=\"editTransactionForm.$invalid\"\n                       class=\"btn btn-lg btn-block btn-warning\">Add\n               </button>\n             </div>\n           </form>\n         </div>\n       </div>\n     </div>\n   </div>\n </div>\n</div>\n");
$templateCache.put("views/signup.html","<div class=\"container\">\n  <br/>\n\n  <div class=\"row\">\n    <div class=\"center-form panel\">\n      <form method=\"post\" ng-submit=\"signup()\" name=\"signupForm\">\n        <div class=\"panel-body\">\n          <h2 class=\"text-center\">Sign up</h2>\n\n          <div class=\"form-group\"\n               ng-class=\"{ \'has-success\' : signupForm.email.$valid && signupForm.email.$dirty, \'has-error\' : signupForm.email.$invalid && signupForm.email.$dirty }\">\n            <input class=\"form-control input-lg\" type=\"email\" id=\"email\"\n                   name=\"email\" ng-model=\"email\" placeholder=\"Email\" required\n                   autofocus>\n\n            <div class=\"help-block text-danger\" ng-if=\"signupForm.email.$dirty\"\n                 ng-messages=\"signupForm.email.$error\">\n              <div ng-message=\"required\">Your email address is required.</div>\n              <div ng-message=\"email\">Your email address is invalid.</div>\n            </div>\n          </div>\n\n          <div class=\"form-group\"\n               ng-class=\"{ \'has-success\' : signupForm.password.$valid && signupForm.password.$dirty, \'has-error\' : signupForm.password.$invalid && signupForm.password.$dirty }\">\n            <input class=\"form-control input-lg\" type=\"password\" name=\"password\"\n                   ng-model=\"password\" placeholder=\"Password\" required>\n\n            <div class=\"help-block text-danger\"\n                 ng-if=\"signupForm.password.$dirty\"\n                 ng-messages=\"signupForm.password.$error\">\n              <div ng-message=\"required\">Password is required.</div>\n            </div>\n          </div>\n\n          <div class=\"form-group\"\n               ng-class=\"{ \'has-success\' : signupForm.confirmPassword.$valid && signupForm.confirmPassword.$dirty, \'has-error\' : signupForm.confirmPassword.$invalid && signupForm.confirmPassword.$dirty }\">\n            <input class=\"form-control input-lg\" type=\"password\"\n                   name=\"confirmPassword\" ng-model=\"confirmPassword\"\n                   repeat-password=\"password\" placeholder=\"Confirm Password\"\n                   required>\n\n            <div class=\"help-block text-danger my-special-animation\"\n                 ng-if=\"signupForm.confirmPassword.$dirty\"\n                 ng-messages=\"signupForm.confirmPassword.$error\">\n              <div ng-message=\"required\">You must confirm password.</div>\n              <div ng-message=\"repeat\">Passwords do not match.</div>\n            </div>\n          </div>\n\n          <button type=\"submit\" ng-disabled=\"signupForm.$invalid\"\n                  class=\"btn btn-lg btn-block btn-primary\">Create Account\n          </button>\n        </div>\n      </form>\n    </div>\n  </div>\n</div>\n");}]);