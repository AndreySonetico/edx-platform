###
E-Commerce Section
###

class ECommerce
# E-Commerce Section
  constructor: (@$section) ->
    # attach self to html so that instructor_dashboard.coffee can find
    #  this object to call event handlers like 'onClickTitle'
    @$section.data 'wrapper', @
    # gather elements
    @$list_purchase_csv_btn = @$section.find("input[name='list-purchase-transaction-csv']'")
    @$download_transaction_group_name = @$section.find("input[name='download_transaction_group_name']'")
    @$active_transaction_group_name = @$section.find("input[name='active_transaction_group_name']'")
    @$spent_transaction_group_name = @$section.find('input[name="spent_transaction_group_name"]')

    @$download_registration_codes_form = @$section.find("form#download_registration_codes")
    @$active_registration_codes_form = @$section.find("form#active_registration_codes")
    @$spent_registration_codes_form = @$section.find("form#spent_registration_codes")

    @$coupoon_error = @$section.find('#coupon-error')
    
    # attach click handlers
    # this handler binds to both the download
    # and the csv button
    @$list_purchase_csv_btn.click (e) =>
      url = @$list_purchase_csv_btn.data 'endpoint'
      url += '/csv'
      location.href = url

    @$download_registration_codes_form.submit (e) =>
      @$coupoon_error.attr('style', 'display: none')
      return true

    @$active_registration_codes_form.submit (e) =>
      @$coupoon_error.attr('style', 'display: none')
      return true

    @$spent_registration_codes_form.submit (e) =>
      @$coupoon_error.attr('style', 'display: none')
      return true

  # handler for when the section title is clicked.
  onClickTitle: ->
    @clear_display()

  # handler for when the section title is clicked.
  onClickTitle: -> @clear_display()

  # handler for when the section is closed
  onExit: -> @clear_display()

  clear_display: ->
    @$coupoon_error.attr('style', 'display: none')
    @$download_transaction_group_name.val('')
    @$active_transaction_group_name.val('')
    @$spent_transaction_group_name.val('')

  isInt = (n) -> return n % 1 == 0;
    # Clear any generated tables, warning messages, etc.

# export for use
# create parent namespaces if they do not already exist.
_.defaults window, InstructorDashboard: {}
_.defaults window.InstructorDashboard, sections: {}
_.defaults window.InstructorDashboard.sections,
   ECommerce:  ECommerce