/* globals DiscussionContentView, DiscussionUtil, ResponseCommentEditView, ResponseCommentShowView */
(function () {
    'use strict';
    var __hasProp = {}.hasOwnProperty,
        __extends = function (child, parent) {
            for (var key in parent) {
                if (__hasProp.call(parent, key)) {
                    child[key] = parent[key];
                }
            }
            function ctor() {
                this.constructor = child;
            }

            ctor.prototype = parent.prototype;
            child.prototype = new ctor();
            child.__super__ = parent.prototype;
            return child;
        };

    if (typeof Backbone !== "undefined" && Backbone !== null) {
        this.ResponseCommentView = (function (_super) {

            __extends(ResponseCommentView, _super);

            function ResponseCommentView() {
                var _this = this;
                this.update = function () {
                    return ResponseCommentView.prototype.update.apply(_this, arguments);
                };
                this.edit = function () {
                    return ResponseCommentView.prototype.edit.apply(_this, arguments);
                };
                this.cancelEdit = function () {
                    return ResponseCommentView.prototype.cancelEdit.apply(_this, arguments);
                };
                this._delete = function () {
                    return ResponseCommentView.prototype._delete.apply(_this, arguments);
                };
                return ResponseCommentView.__super__.constructor.apply(this, arguments);
            }

            ResponseCommentView.prototype.tagName = "li";

            ResponseCommentView.prototype.$ = function (selector) {
                return this.$el.find(selector);
            };

            ResponseCommentView.prototype.initialize = function () {
                return ResponseCommentView.__super__.initialize.call(this);
            };

            ResponseCommentView.prototype.render = function () {
                this.renderShowView();
                return this;
            };

            ResponseCommentView.prototype.renderSubView = function (view) {
                view.setElement(this.$el);
                view.render();
                return view.delegateEvents();
            };

            ResponseCommentView.prototype.renderShowView = function () {
                if (this.showView === null) {
                    if (this.editView) {
                        this.editView.undelegateEvents();
                        this.editView.$el.empty();
                        this.editView = null;
                    }
                    this.showView = new ResponseCommentShowView({
                        model: this.model
                    });
                    this.showView.bind("comment:_delete", this._delete);
                    this.showView.bind("comment:edit", this.edit);
                    return this.renderSubView(this.showView);
                }
            };

            ResponseCommentView.prototype.renderEditView = function () {
                if (this.editView === null) {
                    if (this.showView) {
                        this.showView.undelegateEvents();
                        this.showView.$el.empty();
                        this.showView = null;
                    }
                    this.editView = new ResponseCommentEditView({
                        model: this.model
                    });
                    this.editView.bind("comment:update", this.update);
                    this.editView.bind("comment:cancel_edit", this.cancelEdit);
                    return this.renderSubView(this.editView);
                }
            };

            ResponseCommentView.prototype._delete = function (event) {
                var $elem, url,
                    _this = this;
                event.preventDefault();
                if (!this.model.can('can_delete')) {
                    return;
                }
                if (!confirm(gettext("Are you sure you want to delete this comment?"))) {
                    return;
                }
                url = this.model.urlFor('_delete');
                $elem = $(event.target);
                return DiscussionUtil.safeAjax({
                    $elem: $elem,
                    url: url,
                    type: "POST",
                    success: function () {
                        _this.model.remove();
                        return _this.$el.remove();
                    },
                    error: function () {
                        return DiscussionUtil.discussionAlert(
                            gettext("Sorry"),
                            gettext("We had some trouble deleting this comment. Please try again.")
                        );
                    }
                });
            };

            ResponseCommentView.prototype.cancelEdit = function (event) {
                this.trigger("comment:cancel_edit", event);
                return this.renderShowView();
            };

            ResponseCommentView.prototype.edit = function (event) {
                this.trigger("comment:edit", event);
                return this.renderEditView();
            };

            ResponseCommentView.prototype.update = function (event) {
                var newBody, url,
                    _this = this;
                newBody = this.editView.$(".edit-comment-body textarea").val();
                url = DiscussionUtil.urlFor("update_comment", this.model.id);
                return DiscussionUtil.safeAjax({
                    $elem: $(event.target),
                    $loading: $(event.target),
                    url: url,
                    type: "POST",
                    dataType: "json",
                    data: {
                        body: newBody
                    },
                    error: DiscussionUtil.formErrorHandler(this.$(".edit-comment-form-errors")),
                    success: function () {
                        _this.model.set("body", newBody);
                        return _this.cancelEdit();
                    }
                });
            };

            return ResponseCommentView;

        })(DiscussionContentView);
    }

}).call(window);