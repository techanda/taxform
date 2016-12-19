// Functions
function validateForm(){
    var requiredFormElements    = $(".multi-form .required");
    for (var i = requiredFormElements.length; i > 0; i--){
        if (requiredFormElements[i - 1].value === '') {
            return false;
        } 
        return true;
    }
}


// $('.required').prop('required', true );
$('.form-panel .error-message').hide();

//Sets the panel show/hide state to page load value
if ($(".form-toggle .form-toggle-control").val() !== '1') {
    $($(".form-toggle .form-toggle-control").attr('data-target')).hide();
    $($(".form-toggle .form-toggle-control").attr('data-target')).find('input').prop( "disabled", true );
    $($(".form-toggle .form-toggle-control").attr('data-target')).find('textarea').prop( "disabled", true );
    $($(".form-toggle .form-toggle-control").attr('data-target')).find('button').prop( "disabled", true );
    $($(".form-toggle .form-toggle-control").attr('data-target')).find('input.required').prop( "required", false );
    $($(".form-toggle .form-toggle-control").attr('data-target')).find('textarea.required').prop( "required", false );
    $($(".form-toggle .form-toggle-control").attr('data-target')).find('input').val('');
    $($(".form-toggle .form-toggle-control").attr('data-target')).find('textarea').val('');
}
//Event listener for state change of form-toggle-control
$('.form-toggle .form-toggle-control').on('change',function(){
    if ($(this).val() === '1') {
        $($(this).attr('data-target')).show();
        $($(this).attr('data-target')).find('input').prop( "disabled", false );
        $($(this).attr('data-target')).find('textarea').prop( "disabled", false );
        $($(this).attr('data-target')).find('button').prop( "disabled", false );
        $($(this).attr('data-target')).find('input.required').prop( "required", true );
        $($(this).attr('data-target')).find('textarea.required').prop( "required", true );
    } else {
        $($(this).attr('data-target')).hide();
        $($(this).attr('data-target')).find('input').prop( "disabled", true );
        $($(this).attr('data-target')).find('textarea').prop( "disabled", true );
        $($(this).attr('data-target')).find('button').prop( "disabled", true );
        $($(this).attr('data-target')).find('input.required').prop( "required", false );
        $($(this).attr('data-target')).find('textarea.required').prop( "required", false );
        $($(this).attr('data-target')).find('input').val('');
        $($(this).attr('data-target')).find('textarea').val('');
    }
    
})

$('.form-panel').hide();
$('.form-panel.active').show();
var selectedPanel = $('.form-panel.active').attr('data-index');
var progressPercent = $('.form-panel.active').attr('data-index') / $(".multi-form .form-panel").length * 100;
$('.multi-form-progress-bar').attr('aria-valuenow', progressPercent);
$('.multi-form-progress-bar').css('width', progressPercent + "%");
// $('.multi-form-progress-bar').find('span.sr-only').text($(Math.round(progressPercent) + '% Complete'));

//disables buttons, shows submit button depending on current panel location
if ($('.form-panel.active').attr('data-index') <= 0){
    $('button[data-toggle=back].form-panel-button').prop('disabled', true)
} else {
    $('button[data-toggle=back].form-panel-button').prop('disabled', false)
}
if($('.form-panel.active').attr('data-index') < $(".multi-form .form-panel").length - 1){
    $('button[data-toggle=next].form-panel-button').prop('disabled', false);
    $('button[type=submit].form-panel-button').hide();
    $('button[data-toggle=next].form-panel-button').show();
} else {
    $('button[data-toggle=next].form-panel-button').prop('disabled', true);
    $('button[type=submit].form-panel-button').show();
    $('button[data-toggle=next].form-panel-button').hide();
}

//adds validation on the submit button
$('.multi-form').attr('onsubmit','return validateForm()');

//advances through the form via controll buttons
$('.multi-form .form-panel-button').on('click',function(){
    var selectedPanel           = $('.form-panel.active').attr('data-index'),
        requiredFormElements    = $("div[data-index=" + selectedPanel + "].form-panel .required"),
        formContinue            = true;
        
    if ($(this).attr('data-toggle') === 'next') {
        for (var i = requiredFormElements.length; i > 0; i--){
            if (requiredFormElements[i - 1].value === '') {
                formContinue = false;
            }
        }
        
        if (formContinue !== false) {
            $("div[data-index=" + selectedPanel + "].form-panel .error-message").hide()
            selectedPanel++
            $('.form-panel').removeClass('active');
            $('div[data-index='+ selectedPanel +'].form-panel').addClass('active');
            
        } else {
            $("div[data-index=" + selectedPanel + "].form-panel .error-message").show()
        }
    }
    if ($(this).attr('data-toggle') === 'back') {
        selectedPanel--
        $('.form-panel').removeClass('active');
        $('div[data-index='+ selectedPanel +'].form-panel').addClass('active');
    }
    
    //fadeIn/fadeOut panels
    $('.form-panel').hide();
    $('.form-panel.active').show();
    
    //enables/disables form buttons when at limit
    if(selectedPanel <= 0){
        $('button[data-toggle=back].form-panel-button').prop('disabled', true);
    } else {
        $('button[data-toggle=back].form-panel-button').prop('disabled', false);
    }
    if(selectedPanel < $(".multi-form .form-panel").length - 1){
        $('button[data-toggle=next].form-panel-button').prop('disabled', false);
        $('button[type=submit].form-panel-button').hide();
        $('button[data-toggle=next].form-panel-button').show();
    } else {
        $('button[data-toggle=next].form-panel-button').prop('disabled', true);
        $('button[type=submit].form-panel-button').show();
        $('button[data-toggle=next].form-panel-button').hide();
    }
    
    //progress bar management
    progressPercent = $('.form-panel.active').attr('data-index') / $(".multi-form .form-panel").length * 100;
    $('.multi-form-progress-bar').attr('aria-valuenow', progressPercent);
    $('.multi-form-progress-bar').css('width', progressPercent + "%");
    // $('.multi-form-progress-bar').find('span.sr-only').text($(Math.round(progressPercent) + '% Complete'));
});

