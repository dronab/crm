$(document).ready(function () {
	$('#form-create_zakaz').submit(function (e) {
		console.log($(this).serialize());
		let formData = new FormData($(this)[0]);
		e.preventDefault();
		let form = $(this);
		$.ajax({
			url: 'create/zakaz',
			type: 'POST',
            contentType: false,
            processData: false,
			dataType: 'json',
			data: formData
		}).done((result)=> {
			if (result === true){
				this.reset();
				$('#modal1').modal('close');
			} else {
				console.log('Не сохранились данные');
			}
		}).fail((textStatus) => {
			console.error('Произошла ошибка '+textStatus);
		});
	});
});