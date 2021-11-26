<template>
 <div class="container d-flex justify-content-center">
  <article>
    <header>
     
     <!-- <div
       :class="{'active':index === formPosition}"
       v-for="(step, index) in formGroup"
       :key="'step'+index"
     >
       {{ index + 1 }}
     </div> -->
     <br><br>
     
    </header>
    <section :class="animation">
     <h2>Step:{{formPosition + 1}} {{ formGroup[formPosition].title }}</h2>
    <form class="card" style="width: 40rem;" @submit.prevent="onSubmit()">
       <div class="card-body">
        <div
          v-for="(field, index) in formGroup[formPosition].fields"
          :key="'field'+index"
        >
        
        <div v-if="field.type == 'file'" class="mb-3">
          <label class="form-label">{{ field.label }}</label>
          <input type="file"  class="form-control" id="exampleInputEmail1" required @change="onChange">
        </div>
         <div v-else-if="field.type == 'number'" class="mb-3">
          <label class="form-label">{{ field.label }}</label>
          <input pattern=".{16,}"   required title="16 characters minimum" type="number" v-model="field.value" class="form-control">
        </div>
         <div v-else-if="field.type == 'date'" class="mb-3">
          <label class="form-label">{{ field.label }}</label>
          <input type="date" v-model="field.value" class="form-control" id="exampleInputEmail1" required>
        </div>
          <div v-else-if="field.type == 'verified'" class="mb-3 " >
          <button type="submit" class="btn btn-success d-flex align-items-center">
            <div class="p-1"> Verify </div> <div v-if="isLoading" class="spinner-border ml-auto p-1" role="status" aria-hidden="true"></div>  
          </button>
          
        </div>
        <div v-else class="mb-3">
          <label class="form-label">{{ field.label }}</label>
          <input type="text" v-model="field.value" class="form-control" id="exampleInputEmail1" required>
        </div>

          <!-- <input type="text" v-model="field.value"  required>
          <label>{{ field.label }}</label> -->
        </div>

          <button  class="btn btn-primary"
        v-if="formPosition +1 < formGroup.length -1"  @click="nextStep(formPosition)" :disabled="isNext">
        Next
      </button>
      <button type="submit" class="btn btn-primary"
        v-if="formPosition +1 === formGroup.length -1" >
        Enter
      </button>
     </div>
    </form>
   <div>
 

   </div>
   </section>
   </article>
   </div>
</template>
<script>


  export default {
    
  data: () => {
    var isNext = true;
    var isLoading = false;
    return {
             formPosition: 0,
            isNext,
            isLoading,
             animation: 'animate-in',
             formGroup: [
               {title: "User Verification",
                 fields: [
                   {label: "NIK", value: "" , type: "number"},
                   {label: "Tanggal Lahir", value: "" , type: "date"},
                   {label: "Selfie Picture", value: "", type:"file"},
                   {label: "verified", value: "", type:"verified"},
                   ]},
               {title: "Address",
                 fields: [
                   {label: "City", value: ""},
                   {label: "Zip Code", value: ""},
                   {label: "County", value: ""},
                   {label: "State", value: ""},]},
               {title: "Academic Details",
                 fields: [
                   {label: "Academic qualification", value: ""},
                   {label: "College Attended", value: ""},
                   {label: "Year of completion", value: ""},]},
                ]}},
  methods: {
     onChange (event) {
         this.formGroup[0].fields[1].value = event.target.files
         console.log(this.formGroup[0].fields[1].value)
        },
     nextStep(index){
       if (index == 0) {
          var nik = this.formGroup[index].fields[0].value
          var imageSelfie = this.formGroup[index].fields[1].value
       

          if (nik.toString().length != 16){
            alert("Panjang NIK harus 16.")
          }else{
            this.isNext = false
          }
          
       }

      
    //   this.animation = 'animate-out';
    //   setTimeout(() => {
    //   this.animation = 'animate-in';
    //   this.formPosition += 1;
    //  }, 600);
     },
     onSubmit(){
       this.isLoading = true
       console.log("test masuk  ")
     }
     
     
     }
     
     }
</script>
<style>
.animation-in {
   transform-origin: left;
   animation: in .6s ease-in-out;
}
.animation-out {
   transform-origin: bottom left;
   animation: out .6s ease-in-out;
}
</style>